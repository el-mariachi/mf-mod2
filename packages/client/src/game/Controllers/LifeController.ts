import MapController, { Cell } from './MapController'
import * as Types from '@type/game'
import PatrolMonsterAi from '@game/ai/PatrolMonsterAi'
import PathController from './PathController'
import { emptyAnimationProcess, HERO_MOVE_DELAY } from '@constants/game'
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
      this.cells.hero
    )
    this.pathController = new PathController(mapController.levelN)
    this.makeNpcsSmart()
  }
  async turn(direction: Types.AxisDirection) {
    if (this._paused || (this.status === Status.busy && this.nextTurn)) {
      /** если пауза или уже есть ход в ожидании nextTurn больше не принимаем ход */
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
        await new Promise(resolve => setTimeout(resolve, HERO_MOVE_DELAY))
        await this.npcMove()
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
  async npcMove() {
    const promises: Types.BehaviorAnimatedProcess[] = []
    this.cells.NpcCells.forEach((cell: Cell) => {
      cell.gameObjects.forEach(object => {
        if (Utils.isNpc(object) && object.active) {
          const decision = object.brain.makeDecision()
          const result = this.interaction
            .byNpcDecision(decision)
            .then(interaction => {
              const { target, dir, behavior } = decision
              if (Types.GameInteractionType.none == interaction.type) {
                switch (behavior) {
                  case Types.IdleMotionType.idle:
                    if (dir && object.view.do) {
                      return object.view.do({
                        type: behavior,
                        dir,
                      })
                    }
                    break
                  case Types.MoveMotionType.move:
                    if (target && Utils.isMovable(object)) {
                      return object.moveDelegate.with(target).process
                    }
                    break
                }
              }
              return emptyAnimationProcess
            })
          promises.push(result)
        }
      })
    })
    return Promise.all(promises)
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
  async tend(dir: Types.AxisDirection): Types.BehaviorAnimatedProcess {
    const radius = 1
    /** находим первую клетку по пути движения */
    const targetCells = this.map.nearbyCells(
      this.cells.hero.cell,
      radius,
      dir
    ) as Cell[]

    const targetCell = targetCells[0]
    const cellObjects = targetCell.gameObjects
    const results: Promise<Types.GameInteractionDef>[] = cellObjects.map(item =>
      this.interaction.heroWith(item)
    )
    return Promise.all(results)
      .then(interactions => {
        if (
          interactions.every(interaction => {
            const { type, result } = interaction
            if (Types.GameInteractionType.battle == type) {
              return false
            }
            return true
          }) &&
          cellObjects.every(object => object.crossable)
        ) {
          return this.cells.hero.moveDelegate.with(targetCell).process
        }
        // just turn to dir of last tendation if no interaction or move
        this.cells.hero.view.do({
          type: Types.IdleMotionType.idle,
          dir,
        })
        return emptyAnimationProcess
      })
      .then(res => {
        this.statistic.regStep()
        return res
      })
  }
  toggle(flag?: boolean) {
    const toggle = flag ?? this._paused
    this.statistic.timer.toggle(toggle)
    if ((this._paused = !toggle)) {
      this.nextTurn = null
    }
  }
  protected _haveActiveNpcs() {
    return this.cells.filterObjects(
      (object: Types.GameObjectDef) => Utils.isNpc(object) && object.active
    ).length
  }
}
