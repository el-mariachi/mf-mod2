import GameObject from '@game/Objects/GameObject'
import MapController, { Cell } from './MapController'
import * as Types from '@game/core/types'
import PatrolMonsterAI from '@game/core/AI/PatrolMonsterAI'
import Skeleton from '@game/Objects/Skeleton'
import PathController from './PathController'
import { HERO_MOVE_DELAY } from '@game/core/constants'
import StatisticController from './StatisticController'
import InteractionController from './InteractionController'

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
  smartNPC: unknown[] = []
  status = Status.free
  nextTurn: null | Types.AxisDirection = null
  protected _paused = false
  constructor(mapController: MapController) {
    this.map = mapController.map
    this.cells = mapController.cells
    this.pathController = new PathController(mapController.levelN)
    this.makeNPCSmart()
    this.statistic = new StatisticController()
    this.interaction = new InteractionController(this.map, this.statistic)
  }
  async turn(direction: Types.AxisDirection) {
    if (this._paused) {
      return
      /** если уже есть ход в ожидании nextTurn больше не принимаем ход */
    } else if (this.status === Status.busy && this.nextTurn) {
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
    this.heroMove(direction)
    await new Promise(resolve => setTimeout(resolve, HERO_MOVE_DELAY))
    await this.NPCMove()
    this.status = Status.free
    /** проверяем не появился ли ход в очереди, если появился забираем ход */
    if (this.nextTurn) {
      this.turn(this.nextTurn)
    }
  }
  async heroMove(direction: Types.AxisDirection) {
    this.interaction.clear()
    return this.tend(this.cells.hero, direction)
  }
  async NPCMove() {
    const promises: Promise<Types.CellSpriteAnimationProcessResult>[] = []
    this.cells.NPCCells.forEach((cell: Cell) => {
      cell.gameObjects.forEach(object => {
        if (object.brain && object.cell) {
          /** Ai принимает решение куда направиться и что делать */
          const tendBehavior = object.brain.makeDecision()
          const { type, dir } = tendBehavior
          /** находим клетку по пути движения
           * (данная реализация игнорирует решение AI что делать)
           * решение принимается в tendToCell
           */
          const result = this.tend(object, dir as Types.AxisDirection)
          promises.push(result)
        }
      })
    })
    return Promise.all(promises)
  }
  makeNPCSmart() {
    /** добавляем игровому объект AI в виде свойства brain  */
    this.cells.NPCCells.forEach((cell: Cell) => {
      cell.gameObjects.forEach(object => {
        if (object.name === Types.GameUnitName.skeleton) {
          const skeleton = object as Skeleton
          const path = this.pathController.getPath(cell.position)
          const brain = new PatrolMonsterAI(this.map, skeleton, path)
          object.brain = brain
        }
      })
    })
  }
  /** намериваемся двинуться в направлении */
  async tend(
    object: GameObject,
    direction: Types.AxisDirection
  ): Promise<Types.CellSpriteAnimationProcessResult> {
    const radius = 1
    /** находим первую клетку по пути движения */
    const targetCells = this.map.nearbyCells(
      object.cell,
      radius,
      direction
    ) as Cell[]

    /** Выражаем намерение двинуться в клетку targetCell. */
    const result = this.tendToCell(object, targetCells[0])
    return result
  }
  /** намериваемся передвинуть объект из ячейки currentCell в targetCell */
  tendToCell(
    gameObject: GameObject,
    targetCell: Cell
  ): Promise<Types.CellSpriteAnimationProcessResult> {
    const results = targetCell.gameObjects.map(item =>
      this.interaction.execute(gameObject, item)
    )
    const canMove =
      !results.length ||
      results.every((motion: unknown) => motion === Types.MoveMotionType.move)

    /** если можно пройти */
    if (canMove) {
      if (gameObject.name === Types.GameUnitName.hero) {
        this.statistic.regStep()
      }
      return gameObject.move(targetCell)
    }
    /** если нельзя пройти */
    return results.find(
      el => el instanceof Promise
    ) as Promise<Types.CellSpriteAnimationProcessResult>
  }
  toggle(flag?: boolean) {
    const toggle = flag ?? this._paused
    this.statistic.timer.toggle(toggle)
    if ((this._paused = !toggle)) {
      this.nextTurn = null
    }
  }
}
