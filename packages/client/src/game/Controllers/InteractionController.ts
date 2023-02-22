import { DEF_MOVE_DURATION } from '@constants/game'
import * as Types from '@type/game'
import { store } from '@store/index'
import {
  clearInteractions,
  finishLevel,
  regInteraction,
} from '@store/slices/game'
import { updateHealthByAmount } from '@store/slices/hero'
import GameObject from '@game/objects/GameObject'
import Hero from '@game/objects/Hero'
import MapController, { Cell } from './MapController'
import StatisticController from './StatisticController'

export default class InteractionController {
  constructor(
    protected _map: MapController['map'],
    protected _statistic: StatisticController
  ) { }

  execute(subject: GameObject, object: GameObject) {
    if (subject.name === Types.GameUnitName.hero && object.crossable) {
      return Types.MoveMotionType.move
    }

    /** hero - key */
    if (
      subject.name === Types.GameUnitName.hero &&
      object.name === Types.GameItemName.key
    ) {
      const key: GameObject = object.remove()
      const hero = subject as Hero
      hero.bag.push(key)
      return Types.MoveMotionType.move
    }
    /** hero - coin */
    if (
      subject.name === Types.GameUnitName.hero &&
      object.name === Types.GameItemName.coin
    ) {
      object.remove()
      this._statistic.regItemCollect()
      return Types.MoveMotionType.move
    }
    /** hero - gate */
    if (
      subject.name === Types.GameUnitName.hero &&
      object.name === Types.GameEntourageName.gate
    ) {
      const hero = subject as Hero
      const gate = object
      const key = hero.bag.find(item => item.name === Types.GameItemName.key)
      if (key) {
        /** убираем ключ из сумки */
        hero.bag.splice(hero.bag.indexOf(key), 1)
        const gateNearbyCells = this._map.nearbyCells(gate.cell, 1) as Cell[]
        if (0 !== gate.view?.position[1]) {
          /** убираем ворота */
          gateNearbyCells.forEach(cell => {
            cell.gameObjects.forEach(object => {
              if (object.name === Types.GameEntourageName.gate) {
                object.remove()
              }
            })
          })

          return Types.MoveMotionType.move
        } else {
          store.dispatch(finishLevel())
          return Types.IdleMotionType.idle
        }
      } else
        this.registrate({
          type: Types.GameInteractionType.open,
          object: object.name,
          result: false,
        })

      return Types.IdleMotionType.idle
    }

    const combination = [subject, object]
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
        this._waitEndOfMove(object).then(() => {
          Promise.all([
            // TODO temporary hack
            subject.cell ? subject.attack(object) : Promise.resolve(null),
            object.cell ? object.defend(subject) : Promise.resolve(null),
          ]).then(res => {
            if (object.name === Types.GameUnitName.hero) {
              if (subject.cell) {
                store.dispatch(updateHealthByAmount(-50))
              }
              resolve(res)
            } else {
              this._statistic.regMonsterKill()

              const targetCell = object.cell
              object.die(subject).then(() => resolve(res))
            }
          })
        })
      )
    }
  }
  registrate(interaction: Types.GameInteractionDef) {
    store.dispatch(regInteraction(interaction))
  }
  clear() {
    store.dispatch(clearInteractions())
  }
  // TODO temporary hack
  _waitEndOfMove(gameObject: GameObject) {
    if (!gameObject.isNPC) {
      return new Promise(resolve => setTimeout(resolve, DEF_MOVE_DURATION * 5))
    } else {
      return new Promise(resolve => resolve(1))
    }
  }
}
