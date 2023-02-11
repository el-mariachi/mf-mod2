import GameObject from '@game/Objects/GameObject'
import MapController, { Cell } from './MapController'
import * as Types from '@game/core/types'
import UnitView from '@game/core/views/UnitView'
import PatrolMonsterAI from '@game/core/AI/PatrolMonsterAI'
import Skeleton from '@game/Objects/Skeleton'
import PathController from './PathController'
import Hero from '@game/Objects/Hero'

enum Status {
  free,
  busy,
}

export default class LifeController {
  map: MapController['map']
  cells: MapController['cells']
  pathController: PathController
  smartNPC: unknown[] = []
  status = Status.free
  nextTurn: null | Types.AxisDirection = null
  constructor(mapController: MapController, statistic = null) {
    this.map = mapController.map
    this.cells = mapController.cells
    this.pathController = new PathController(mapController.levelN)
    this.makeNPCSmart()
  }
  async turn(direction: Types.AxisDirection) {
    /** если уже есть ход в ожидании nextTurn больше не принимаем ход */
    if (this.status === Status.busy && this.nextTurn) {
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
    await this.heroMove(direction)
    await this.NPCMove()
    this.status = Status.free
    /** проверяем не появился ли ход в очереди, если появился забираем ход */
    if (this.nextTurn) {
      this.turn(this.nextTurn)
    }
  }
  async heroMove(direction: Types.AxisDirection) {
    const radius = 1
    const currentCell = this.cells.heroCell
    /** находим первую клетку по пути движения */
    const targetCells = this.map.nearbyCells(
      currentCell,
      radius,
      direction
    ) as Cell[]

    /** Выражаем намерение двинуться в клетку targetCell.
     *  Резултат движения передается в motionType и анимируется  */
    const motionType = this.tendToCell(
      this.cells.hero,
      currentCell,
      targetCells[0]
    )
    if (motionType) {
      const behavior = { type: motionType, dir: direction }
      this.cells.hero.view.do(behavior)
    }
  }
  async NPCMove() {
    const promises: Promise<Types.CellSpriteAnimationProcessResult>[] = []
    this.cells.NPCCells.forEach((cell: Cell) => {
      cell.gameObjects.forEach(object => {
        if (object.brain) {
          /** Ai принимает решение куда направиться и что делать */
          const tendBehavior = object.brain.makeDecision()
          const { type, dir } = tendBehavior
          /** находим клетку по пути движения
           * (данная реализация игнорирует решение AI что делать)
           * решение принимается в tendToCell
           */
          const targetCells = this.map.nearbyCells(
            cell,
            1,
            dir as Types.AxisDirection
          ) as Cell[]
          /** Выражаем намерение двинуться в клетку targetCell.
           *  Резултат движения передается в motionType и анимируется  */
          const motionType = this.tendToCell(object, cell, targetCells[0])
          const behavior = { type: motionType, dir } as Types.UnitBehaviorDef
          const animation = (object.view as UnitView).do(behavior)
          promises.push(animation)
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
  /** намериваемся передвинуть объект из ячейки currentCell в targetCell */
  tendToCell(gameObject: GameObject, currentCell: Cell, targetCell: Cell) {
    const [row, col] = targetCell.position
    /** если по направлению движения нет объектов или через них можно пройти */
    if (
      targetCell.gameObjects.length === 0 ||
      targetCell.gameObjects.every(object => object.crossable)
    ) {
      return this.moveToCell(gameObject, currentCell, targetCell)
    } else {
      const results = targetCell.gameObjects.map(item =>
        this.interaction(gameObject, item)
      )
      const canMove = results.every(
        (motion: unknown) => motion === Types.MoveMotionType.move
      )
      if (canMove) {
        return this.moveToCell(gameObject, currentCell, targetCell)
      }
    }
  }
  moveToCell(gameObject: GameObject, currentCell: Cell, targetCell: Cell) {
    const [row, col] = targetCell.position
    const _gameObject = currentCell.extract(gameObject)
    this.map[row][col].addObject(_gameObject)
    return Types.MoveMotionType.move
  }
  interaction(gameObjectActive: GameObject, gameObjectPasive: GameObject) {
    /** hero - key */
    if (
      gameObjectActive.name === Types.GameUnitName.hero &&
      gameObjectPasive.name === Types.GameItemName.key
    ) {
      gameObjectPasive.view!.toggle(false)
      const key: GameObject = gameObjectPasive.cell!.extract(gameObjectPasive)
      const hero = gameObjectActive as Hero
      hero.bag.push(key)
      return Types.MoveMotionType.move
      /** hero - gate */
    } else if (
      gameObjectActive.name === Types.GameUnitName.hero &&
      gameObjectPasive.name === Types.GameEntourageName.gate
    ) {
      const hero = gameObjectActive as Hero
      const gate = gameObjectPasive
      const key = hero.bag.find(item => item.name === Types.GameItemName.key)
      if (key) {
        /** убираем ключ из сумки */
        hero.bag.splice(hero.bag.indexOf(key), 1)
        const gateNearbyCells = this.map.nearbyCells(
          gate.cell as Cell,
          1
        ) as Cell[]
        /** убираем ворота */
        gateNearbyCells.forEach(cell => {
          cell.gameObjects.forEach(object => {
            if (object.name === Types.GameEntourageName.gate) {
              object.view!.toggle(false)
              object.cell?.extract(object)
            }
          })
        })

        return Types.MoveMotionType.move
      }
      return Types.IdleMotionType.idle
    }
    const combination = [gameObjectActive, gameObjectPasive]
    /** hero - npc */
    if (
      combination.some(object => object.name === Types.GameUnitName.hero) &&
      combination.some(object => object.isNPC)
    ) {
      //gameObjectActive.view.do('atack')
      //gameObjectPasive.view.do('death')
    }
  }
}
