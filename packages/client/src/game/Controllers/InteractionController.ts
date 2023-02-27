import * as Types from '@type/game'
import { store } from '@store/index'
import {
  clearInteractions,
  finishLevel,
  regInteraction,
} from '@store/slices/game'
import MapController from './MapController'
import StatisticController from './StatisticController'
import * as Utils from '@utils/game'

export default class InteractionController {
  constructor(
    protected _statistic: StatisticController,
    // TODO here need other type
    protected _map: MapController['map'],
    protected _hero: Types.Hero
  ) {}
  byNpcDecision(
    decision: Types.BehaviorDecision
  ): Promise<Types.GameInteractionDef> {
    const { subject, behavior, object } = decision

    let interaction = Promise.resolve({
      type: Types.GameInteractionType.none,
      behavior,
    })
    switch (behavior) {
      case Types.AttackMotionType.attack:
        if (
          Utils.isAttacker(subject) &&
          object &&
          Utils.isDestroyable(object)
        ) {
          interaction = this._waitEndOfProcess4(object)
            .then(() => this._battle(subject, object))
            .then(() => {
              return {
                type: Types.GameInteractionType.battle,
                behavior,
              }
            })
        }
        break
    }
    return interaction
  }
  heroWith(object: Types.GameObjectDef) {
    if (Utils.isCollectable(object)) {
      return this._collect(object)
    } else if (Utils.isUnlockable(object)) {
      return this._unlock(object)
    } else if (Utils.isMonster(object) && Utils.isDestroyable(object)) {
      return this._attack(object)
    }
    return Types.IdleMotionType.idle
  }
  registrate(interaction: Types.GameInteractionDef) {
    store.dispatch(regInteraction(interaction))
  }
  clear() {
    store.dispatch(clearInteractions())
  }
  protected _collect(object: Types.Collectable) {
    switch (object.name) {
      case Types.GameItemName.key:
        this._hero.bag.push(object.remove())
        return Types.MoveMotionType.move
        break

      case Types.GameItemName.coin:
        this._statistic.regItemCollect(object.remove())
        return Types.MoveMotionType.move
        break

      default:
        return Types.IdleMotionType.idle
        break
    }
  }
  protected _unlock(object: Types.Unlockable) {
    switch (object.name) {
      case Types.GameEntourageName.gate:
        const gate = object
        const key = this._hero.bag.find(
          item => item.name === Types.GameItemName.key
        )
        if (key) {
          /** убираем ключ из сумки */
          this._hero.bag.splice(this._hero.bag.indexOf(key), 1)
          const gateNearbyCells = this._map.nearbyCells(
            gate.cell,
            1
          ) as Types.LevelMapCell[]
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
            // TODO check that after pause and no any actions
            return Types.IdleMotionType.idle
          }
        } else
          this.registrate({
            type: Types.GameInteractionType.unlock,
            object: object.name,
            result: false,
          })
        break

      default:
        return Types.IdleMotionType.idle
        break
    }
  }
  protected _attack(target: Types.Destroyable) {
    this._battle(this._hero, target)
  }
  protected _battle(attacker: Types.Attacker, attacked: Types.Destroyable) {
    return new Promise(resolve =>
      this._waitEndOfProcess4(attacked).then(() => {
        const attack = attacker.attackDelegate.with(attacked)
        let attackResult = attack.result

        let defend: Types.DefendResult | null = null
        if (Utils.isDefendable(attacked)) {
          defend = attacked.defendDelegate.with(attackResult)
          attackResult = defend.result
        }

        let damage: Types.DamageResult
        const interaction2register: Types.GameInteractionDef<Types.UnitResource> =
          {
            type: Types.GameInteractionType.battle,
            subject: attacker.name,
            object: attacked.name,
            result: {
              value: attacked.health,
              max: attacked.healthMax,
            },
          }
        if (Utils.isHero(attacker)) {
          console.log(interaction2register)
          this.registrate(interaction2register)
          damage = attacked.damageDelegate.with(attackResult)
        }
        Promise.all([
          attack.process,
          defend ? defend.process : Promise.resolve(),
        ]).then(res => {
          if (!damage) {
            damage = attacked.damageDelegate.with(attackResult)
          }
          damage.process.then(() => {
            if (Utils.isHero(attacker)) {
              this.registrate({
                ...interaction2register,
                ...{
                  result: {
                    value: attacked.health,
                    max: attacked.healthMax,
                  },
                },
              })
            }
            const isDestroyed = damage.result
            if (isDestroyed) {
              if (Utils.isMonster(attacked)) {
                this._statistic.regMonsterKill(attacked)
              }
              attacked.remove()
            }
            resolve(res)
          })
        })
      })
    )
  }
  protected _waitEndOfProcess4(object: Types.GameObjectDef) {
    return new Promise<unknown>(resolve => {
      if (
        object instanceof Object &&
        Utils.isUnit(object) &&
        object.curBehavior
      ) {
        object.curBehavior.process.then(resolve)
      } else resolve(null)
    })
  }
  // DEPRICATED
  perform(subject: Types.GameObjectDef, object: Types.GameObjectDef) {
    if (object.crossable) {
      return Types.MoveMotionType.move
    }
    if (Utils.isHero(subject)) {
      return this.heroWith(object)
    } else {
      const combination = [subject, object]
      if (
        combination.some(object => Utils.isHero(object)) &&
        combination.some(object => Utils.isMonster(object))
      ) {
        if (Utils.isAttacker(subject) && Utils.isDestroyable(object)) {
          return this._battle(subject, object)
        }
      }
    }
    return Types.IdleMotionType.idle
  }
}
