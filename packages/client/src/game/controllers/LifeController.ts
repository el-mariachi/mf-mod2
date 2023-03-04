import * as Types from '@type/game'
import { emptyAnimationProcess, HERO_MOVE_DELAY } from '@constants/game'
import { finishLevel } from '@store/slices/game'
import { store } from '@store/index'
import PatrolMonsterAi from '@game/ai/PatrolMonsterAI'
import MapController, { Cell } from './MapController'
import PathController from './PathController'
import StatisticController from './StatisticController'
import InteractionController from './InteractionController'
import * as Utils from '@utils/game'

enum Status {
  free,
  busy,
}

export default class LifeController {
  map: MapController['map']
  cells: MapController['cells']
  pathController: PathController
  statistic: StatisticController
  interaction: InteractionController
  status = Status.free
  nextTurn: null | Types.AxisDirection = null
  protected _paused = false
  protected _finished = false
  constructor(mapController: MapController) {
    this.map = mapController.map
    this.cells = mapController.cells
    this.statistic = new StatisticController()
    this.interaction = new InteractionController(
      this.statistic,
      this.map,
      this._hero
    )
    this.pathController = new PathController(mapController.levelN)
    this.makeNpcsSmart()
  }
  async turn(direction: Types.AxisDirection) {
    /** если пауза или уже есть ход в ожидании nextTurn больше не принимаем ход */
    if (this._paused || (this.status === Status.busy && this.nextTurn)) {
      return
      /** если контроллер занят, но очередь свободна, занимаем очередь */
    } else if (this.status === Status.busy) {
      this.nextTurn = direction
      return
      /** если контроллер свободен и есть очередь, очищаем очередь, меняем статус на занят */
    } else if (this.status === Status.free && this.nextTurn) {
      this.nextTurn = null
    }
    /** если контроллер свободен, начинаем обработку и меняем статус на занят */
    this.status = Status.busy

    await this._hero.prevStepProcess
    this.heroMove(direction)
    if (!this._finished) {
      await new Promise(resolve => setTimeout(resolve, HERO_MOVE_DELAY))
      await this.npcsMove()
    }
    this.status = Status.free
    /** проверяем не появился ли ход в очереди, если появился забираем ход */
    if (this.nextTurn) {
      this.turn(this.nextTurn)
    }
  }
  async heroMove(direction: Types.AxisDirection) {
    this.interaction.clear()

    this._hero.prevInteractions = []
    Utils.actualizePosition(this._hero)

    return this.tend(direction)
  }
  async npcsMove(): Types.AnimatedBehaviorProcess {
    const promises: Types.AnimatedBehaviorProcess[] = []
    this.cells.NpcCells.some((cell: Cell) => {
      cell.gameObjects.some(object => {
        if (Utils.isNpc(object) && object.active) {
          object.prevBehavior = null
          Utils.actualizePosition(object)

          const decision = object.brain.makeDecision()
          const { target, dir, behavior } = decision
          const interaction = this.interaction.byNpcDecision(decision)

          let resultProcess: Types.AnimatedBehaviorProcess =
            emptyAnimationProcess

          this._finishByInteractionIfFound(interaction)

          if (interaction instanceof Promise) {
            resultProcess = interaction.then(interaction => {
              this._finishByInteractionIfFound(interaction)
              return emptyAnimationProcess
            })
          } else if (
            Types.MoveMotionType.move == behavior &&
            target &&
            Utils.isMovable(object)
          ) {
            resultProcess = object.moveDelegate.with(target).process
          } else if (Types.IdleMotionType.idle == behavior && dir) {
            object.view.idle?.(dir)
          }
          promises.push(resultProcess)
        }
        return this._finished
      })
      return this._finished
    })
    return Promise.all(promises).then(() => emptyAnimationProcess)
  }
  makeNpcsSmart() {
    this.cells.NpcCells.forEach((cell: Cell) => {
      cell.gameObjects.forEach(object => {
        if (
          Utils.isMonster(object) &&
          object.brain instanceof PatrolMonsterAi
        ) {
          object.brain.knownMap = this.map
          object.brain.patrolPath = this.pathController.getPath(cell.position)
        }
      })
    })
  }
  /** намериваемся двинуться в направлении */
  async tend(dir: Types.AxisDirection): Types.AnimatedBehaviorProcess {
    const radius = 1
    /** находим первую клетку по пути движения */
    const targetCells = this.map.nearbyCells(
      this._hero.cell as Types.LevelMapCell,
      radius,
      dir
    ) as Cell[]

    const targetCell = targetCells[0]
    const targetCellObjects = targetCell.gameObjects

    const interactions: Types.GameInteractionResult[] = targetCellObjects.map(
      object => this.interaction.heroWith(object)
    )
    const interactionsProcess = interactions.filter(
      interaction => interaction instanceof Promise
    ) as Types.GameInteractionProcess[]
    const haveLastingInteractions = interactionsProcess.length
    const isTargetCellCrossable = targetCellObjects.every(
      object => object.crossable
    )
    this._hero.prevInteractions = interactionsProcess

    let resultProcess: Types.AnimatedBehaviorProcess = emptyAnimationProcess
    const isFinished = this._finishByInteractionIfFound(interactions)
    if (!isFinished) {
      if (haveLastingInteractions) {
        resultProcess = Promise.all(interactionsProcess).then(interactions => {
          this.statistic.regStep()
          if (!this._finishByInteractionIfFound(interactions)) {
            this._hero.view.idle?.(dir)
          }
          return emptyAnimationProcess
        })
      } else if (isTargetCellCrossable) {
        resultProcess = this._hero.moveDelegate
          .with(targetCell)
          .process.then(res => {
            this.statistic.regStep()
            return res
          })
      } else {
        this.statistic.regStep()
        this._hero.view.idle?.(dir)
      }
    } else this.statistic.regStep()

    return resultProcess
  }
  toggle(flag?: boolean) {
    const toggle = flag ?? this._paused
    this.statistic.timer.toggle(toggle)
    if ((this._paused = !toggle)) {
      this.nextTurn = null
    }
  }
  finish() {
    this._finished = true
    this.toggle(false)
    this.interaction.clear()
    store.dispatch(finishLevel())
  }
  protected get _hero() {
    return this.cells.hero as Types.Hero
  }
  protected _finishByInteractionIfFound(
    interaction: Types.GameInteractionResult | Types.GameInteractionResult[]
    // regStepBefore = false
  ) {
    const foundFinishInteraction = Array.isArray(interaction)
      ? interaction.some(interaction =>
          this._checkIsFinishInteraction(interaction)
        )
      : this._checkIsFinishInteraction(interaction)

    if (foundFinishInteraction) {
      // if (regStepBefore) {
      //   this.statistic.regStep()
      // }
      this.finish()
    }
    return foundFinishInteraction
  }
  protected _checkIsFinishInteraction(
    interaction: Types.GameInteractionResult
  ) {
    return (
      'type' in interaction &&
      Types.GameInteractionType.finish == interaction.type
    )
  }
  protected _haveActiveNpc() {
    return (
      this.cells.filterObjects(
        (object: Types.GameObjectDef) => Utils.isNpc(object) && object.active
      ).length > 0
    )
  }
}
