import GameObject from '@game/Objects/GameObject'
import MapController, { Cell } from './MapController'
import * as Types from '@game/core/types'
import UnitView from '@game/core/views/UnitView'
import PatrolMonsterAI from '@game/core/AI/PatrolMonsterAI'
import Skeleton from '@game/Objects/Skeleton'
import PathController from './PathController'
import Hero from '@game/Objects/Hero'
import { defineDir } from '@game/utils'
import * as Behaviors from '@game/animations/behavior'
import { DEF_MOVE_DURATION, HERO_MOVE_DELAY } from '@game/core/constants'

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
    console.log(this.map)
    this.heroMove(direction)
    await new Promise(resolve => setTimeout(resolve, HERO_MOVE_DELAY))
    await this.NPCMove()
    console.log('monsters turns end', performance.now())
    this.status = Status.free
    /** проверяем не появился ли ход в очереди, если появился забираем ход */
    if (this.nextTurn) {
      this.turn(this.nextTurn)
    }
  }
  async heroMove(direction: Types.AxisDirection) {
    return this.tend(this.cells.hero, direction)
    //return new Promise(resolve => setTimeout(resolve, 100))
  }
  async NPCMove() {
    const promises: Promise<Types.CellSpriteAnimationProcessResult>[] = []
    this.cells.NPCCells.forEach((cell: Cell) => {
      cell.gameObjects.forEach(object => {
        if (
          object.cell.position.toString() !==
          object.view?.position.reverse().toString()
        ) {
          console.log('!!!!!!!!!!!!!!!', object)
          console.log(
            object.cell.position.toString(),
            object.view?.position.reverse().toString()
          )
        }

        if (object.brain) {
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
    /** результат =
     * move - если клетка пустая
     * atack & stay - если в в клетке npc
     * take & move - если в клетке предмет
     */

    const results = targetCell.gameObjects.map(item =>
      this.interaction(gameObject, item)
    )
    const canMove =
      !results.length ||
      results.every((motion: unknown) => motion === Types.MoveMotionType.move)

    /** если можно пройти */
    if (canMove) {
      return gameObject.move(targetCell)
      //задержка мужду двумя движениями
      // задержка если следующее движение защита
      //return new Promise(resolve => setTimeout(resolve, HERO_MOVE_DELAY))
    }
    //console.log('нельзя', gameObject, targetCell)
    /** если нельзя пройти */
    return results.find(
      el => el instanceof Promise
    ) as Promise<Types.CellSpriteAnimationProcessResult>
  }
  interaction(gameObjectActive: GameObject, gameObjectPasive: GameObject) {
    /** hero - crossable item */
    if (
      gameObjectActive.name === Types.GameUnitName.hero &&
      gameObjectPasive.crossable
    ) {
      return Types.MoveMotionType.move
    }

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
    }

    /** hero - gate */
    if (
      gameObjectActive.name === Types.GameUnitName.hero &&
      gameObjectPasive.name === Types.GameEntourageName.gate
    ) {
      const hero = gameObjectActive as Hero
      const gate = gameObjectPasive
      const key = hero.bag.find(item => item.name === Types.GameItemName.key)
      if (key) {
        /** убираем ключ из сумки */
        hero.bag.splice(hero.bag.indexOf(key), 1)
        const gateNearbyCells = this.map.nearbyCells(gate.cell, 1) as Cell[]
        /** убираем ворота */
        gateNearbyCells.forEach(cell => {
          cell.gameObjects.forEach(object => {
            if (object.name === Types.GameEntourageName.gate) {
              object.view!.toggle(false)
              object.cell.extract(object)
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
      /** если атакует герой ничего не ждем, так как все  анимации нпс завершились
       */

      /** если атакует нпс
       * прежде чем начать анимацию убеждаемся что предыдущие анимации закончились
       */

      return new Promise(resolve =>
        this.waitEndOfMove(gameObjectPasive).then(() => {
          Promise.all([
            gameObjectActive.attack(gameObjectPasive),
            gameObjectPasive.defend(gameObjectActive),
          ]).then(resolve)
        })
      )
    }
  }
  /** ждем пока закончится анимация движения героя перед атакой npc
   * ? npc не ждут героя (у this.heroMove нет await)
   * сделано чтобы у героя не было задержек между движениями
   *    * */
  waitEndOfMove(gameObject: GameObject) {
    if (!gameObject.isNPC) {
      /** DEF_MOVE_DURATION  */
      return new Promise(resolve => setTimeout(resolve, DEF_MOVE_DURATION * 5))
    } else {
      return new Promise(resolve => resolve(1))
    }
  }
}
