import { DEF_MOVE_DURATION } from '@constants/game'
import * as Types from '@type/game'
import { store } from '@store/index'
import {
  clearInteractions,
  finishLevel,
  regInteraction,
} from '@store/slices/game'
import GameObject from '@game/objects/GameObject'
import _Hero from '@game/objects/Hero'
import MapController, { Cell } from './MapController'
import StatisticController from './StatisticController'
import * as Utils from '@utils/game'

export default class InteractionController {
  constructor(
    protected _map: MapController['map'],
    protected _statistic: StatisticController
  ) {}

  execute(subject: GameObject, object: GameObject) {
    if (subject.name === Types.GameUnitName.hero && object.crossable) {
      return Types.MoveMotionType.move
    }

    /** hero - key */
    if (
      subject.name === Types.GameUnitName.hero &&
      object.name === Types.GameItemName.key
    ) {
      const key: Types.GameObjectDef = object.remove()
      const hero = subject as _Hero
      hero.bag.push(key)
      return Types.MoveMotionType.move
    }
    /** hero - coin */
    if (
      subject.name === Types.GameUnitName.hero &&
      object.name === Types.GameItemName.coin
    ) {
      this._statistic.regItemCollect(object)
      object.remove()
      return Types.MoveMotionType.move
    }
    /** hero - gate */
    if (
      subject.name === Types.GameUnitName.hero &&
      object.name === Types.GameEntourageName.gate
    ) {
      const hero = subject as _Hero
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
      combination.some(object => Utils.isHero(object)) &&
      combination.some(object => Utils.isMonster(object))
    ) {
      if (Utils.isAttacker(subject) && Utils.isDestroyable(object)) {
        const attack = subject.attackDelegate.with(object)
        let attackResult = attack.result

        let defend: Types.DefendResult | null = null
        if (Utils.isDefendable(object)) {
          defend = object.defendDelegate.with(attackResult)
          attackResult = defend.result
        }

        /** если атакует герой ничего не ждем, так как все  анимации нпс завершились
         */

        /** если атакует нпс
         * прежде чем начать анимацию убеждаемся что предыдущие анимации закончились
         */
        return new Promise(resolve =>
          this._waitEndOfMove(object).then(() => {
            Promise.all([
              // TODO temporary hack
              subject.cell ? attack.process : Promise.resolve(null),
              object.cell && defend ? defend.process : Promise.resolve(null),
            ]).then(res => {
              const damage = object.damageDelegate.with(attackResult)

              damage.process.then(() => {
                const isKilled = damage.result
                if (isKilled) {
                  if (Utils.isMonster(object)) {
                    this._statistic.regMonsterKill(object)
                    object.remove()
                  }
                }
                resolve(res)
              })
            })
          })
        )
      }

      // TODO otherwise no action
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
    if (!Utils.isNpc(gameObject)) {
      return new Promise(resolve => setTimeout(resolve, DEF_MOVE_DURATION * 5))
    } else {
      return new Promise(resolve => resolve(1))
    }
  }
}
