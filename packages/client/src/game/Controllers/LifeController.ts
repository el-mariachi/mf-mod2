import MapController, { Cell } from './MapController'
import * as Types from '@type/game'
import PatrolMonsterAi from '@game/ai/PatrolMonsterAi'
import PathController from './PathController'
import { emptyAnimationProcess, HERO_MOVE_DELAY } from '@constants/game'
import StatisticController from './StatisticController'
import InteractionController from './InteractionController'
import * as Utils from '@utils/game'
import { finishLevel } from '@store/slices/game'
import { store } from '@store/index'

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
      this.status = Status.busy
      this.nextTurn = null
    }
    /** если контроллер свободен, начинаем обработку и меняем статус на занят */
    this.status = Status.busy
    if (this._haveActiveNpcs()) {
      this.heroMove(direction)
      if (!this._finished) {
        // console.log('now npcs turn')
        await new Promise(resolve => setTimeout(resolve, HERO_MOVE_DELAY))
        await this.npcsMove()
      }
    } else await this.heroMove(direction)
    this.status = Status.free
    /** проверяем не появился ли ход в очереди, если появился забираем ход */
    if (this.nextTurn) {
      this.turn(this.nextTurn)
    }
  }
  async heroMove(direction: Types.AxisDirection) {
    this.interaction.clear()
    return this.tend(direction)
  }
  async npcsMove(): Types.AnimatedBehaviorProcess {
    const promises: Types.AnimatedBehaviorProcess[] = []
    this.cells.NpcCells.every((cell: Cell) => {
      cell.gameObjects.every(object => {
        if (Utils.isNpc(object) && object.active) {
          const decision = object.brain.makeDecision()
          const { target, dir, behavior } = decision
          const interaction = this.interaction.byNpcDecision(decision)

          let resultProcess: Types.AnimatedBehaviorProcess =
            emptyAnimationProcess

          // if (this._isFinishedByInteraction(interaction))
          // {
          //   return resultProcess
          // }
          this._finishByInteractionIfFound(interaction)

          // if ('type' in interaction && Types.GameInteractionType.finish == interaction.type) {
          //   this.finish()
          // }
          // else
          if (interaction instanceof Promise) {
            resultProcess = interaction.then(interaction => {
              // console.log(interaction)
              // if (Types.GameInteractionType.finish == interaction.type) {
              //   // const { object } = interaction
              //   // if (Types.GameUnitName.hero == object && !this._hero || 0 === this._hero.health) {
              //   this.finish()
              //   // }
              // }
              // if (Types.GameInteractionType.battle == interaction.type) {
              //   const { object } = interaction
              //   if (Types.GameUnitName.hero == object && !this._hero || 0 === this._hero.health) {
              //     this.finish()
              //   }
              // }

              this._finishByInteractionIfFound(interaction)
              // if (!this._finishByInteraction(interaction))
              // {
              //   // ...can handle interaction if need
              // }
              return emptyAnimationProcess
            })
          }
          // else if (this._finishByInteractionIfFound(interaction)) {
          //   return resultProcess
          // }
          else if (
            Types.MoveMotionType.move == behavior &&
            target &&
            Utils.isMovable(object)
          ) {
            resultProcess = object.moveDelegate.with(target).process
          } else if (
            Types.IdleMotionType.idle == behavior &&
            dir &&
            object.view.do
          ) {
            object.view.do({
              type: behavior,
              dir,
            })
          }
          // const result = this.interaction
          //   .byNpcDecision(decision)
          //   .then(interaction => {
          //     const { type } = interaction
          //     const { target, dir, behavior } = decision
          //     if (Types.GameInteractionType.none == type) {
          //       switch (behavior) {
          //         case Types.IdleMotionType.idle:
          //           if (dir && object.view.do) {
          //             object.view.do({
          //               type: behavior,
          //               dir,
          //             })
          //           }
          //           break
          //         case Types.MoveMotionType.move:
          //           if (target && Utils.isMovable(object)) {
          //             return object.moveDelegate.with(target).process
          //           }
          //           break
          //       }
          //     }
          //     else if (Types.GameInteractionType.finish == type) {
          //       this.finish()
          //     }
          //     return emptyAnimationProcess
          //   })
          promises.push(resultProcess)
        }
        return !this._finished
      })
      return !this._finished
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
      this._hero.cell,
      radius,
      dir
    ) as Cell[]

    const targetCell = targetCells[0]
    const targetCellObjects = targetCell.gameObjects

    const interactions: Types.GameInteractionResult[] = targetCellObjects.map(
      object => this.interaction.heroWith(object)
    )
    // const interactionDefs = interactions.filter(interaction => !(interaction instanceof Promise))
    const interactionsProcess = interactions.filter(
      interaction => interaction instanceof Promise
    )
    // const haveFinishInteraction = interactions.some(interaction => 'type' in interaction && Types.GameInteractionType.finish == interaction.type)
    const haveLastingInteractions = interactionsProcess.length
    const isTargetCellCrossable = targetCellObjects.every(
      object => object.crossable
    )

    this._finishByInteractionIfFound(interactions)

    let resultProcess: Types.AnimatedBehaviorProcess = emptyAnimationProcess
    // if (haveFinishInteraction) {
    //   this.finish()
    // }
    // if (this._finishByInteraction(interactions)) {
    //   return resultProcess
    // }
    // else
    if (haveLastingInteractions) {
      resultProcess = Promise.all(interactionsProcess).then(interactions => {
        // if (interactions.some(interaction => Types.GameInteractionType.finish == interaction.type)) {
        //   // const { object } = interaction
        //   // if (Types.GameUnitName.hero == object && !this._hero || 0 === this._hero.health) {
        //   this.finish()
        //   // }
        // }
        this._finishByInteractionIfFound(interactions)
        // if (!this._finishByInteraction(interactions))
        // {
        //   // ...can handle interaction if need
        // }
        return emptyAnimationProcess
      })
    } else if (isTargetCellCrossable) {
      resultProcess = this._hero.moveDelegate.with(targetCell).process
    }
    // just turn to dir of tend attemp if no lasting interaction or move
    else
      this._hero.view.do({
        type: Types.IdleMotionType.idle,
        dir,
      })

    return resultProcess.then(res => {
      this.statistic.regStep()
      return res
    })

    // return Promise.all(interactionsResult)
    //   .then(interactions => {
    //     if (interactions.some(interaction => Types.GameInteractionType.finish == interaction.type)) {
    //       this.finish()
    //     }
    //     const isTargetCellCrossable = cellObjects.every(object => object.crossable)
    //     if (
    //       !this._finished &&
    //       // interactions.every(interaction => {
    //       //   const { type, result } = interaction
    //       //   if (Types.GameInteractionType.battle == type) {
    //       //     return false
    //       //   }
    //       //   return true
    //       // }) &&
    //       isTargetCellCrossable
    //     ) {
    //       return this._hero.moveDelegate.with(targetCell).process
    //     }
    //     // just turn to dir of tend attemp if no interaction or move
    //     this._hero.view.do({
    //       type: Types.IdleMotionType.idle,
    //       dir,
    //     })
    //     return emptyAnimationProcess
    //   })
    //   .then(res => {
    //     this.statistic.regStep()
    //     return res
    //   })
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
    return this.cells.hero
  }
  protected _finishByInteractionIfFound(
    interaction: Types.GameInteractionResult | Types.GameInteractionResult[]
  ) {
    const foundFinishInteraction = Array.isArray(interaction)
      ? interaction.some(interaction =>
          this._checkIsFinishInteraction(interaction)
        )
      : this._checkIsFinishInteraction(interaction)

    if (foundFinishInteraction) {
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
  protected _haveActiveNpcs() {
    return (
      this.cells.filterObjects(
        (object: Types.GameObjectDef) => Utils.isNpc(object) && object.active
      ).length > 0
    )
  }
}
