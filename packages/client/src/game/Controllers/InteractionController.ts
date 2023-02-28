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
import {
  finishInteraction,
  noInteraction,
  noInteractionRes,
} from '@constants/game'

export default class InteractionController {
  constructor(
    protected _statistic: StatisticController,
    // TODO here need LevelMap type
    protected _map: MapController['map'],
    protected _hero: Types.Hero
  ) {}
  byNpcDecision(decision: Types.BehaviorDecision): Types.GameInteractionResult {
    const { subject, behavior, object } = decision
    switch (behavior) {
      case Types.AttackMotionType.attack:
        if (
          Utils.isAttacker(subject) &&
          object &&
          Utils.isDestroyable(object)
        ) {
          return this._waitEndOfAnimations(object).then(() =>
            this._battle(subject, object)
          )
          // .then(() => {
          //   return {
          //     type: Types.GameInteractionType.battle,
          //     behavior,
          //   }
          // })
        }
        break
    }
    return noInteraction
  }
  heroWith(object: Types.GameObjectDef): Types.GameInteractionResult {
    if (Utils.isMonster(object) && Utils.isDestroyable(object)) {
      return this._heroAttack(object)
    } else if (Utils.isUnlockable(object)) {
      return this._unlock(object)
    } else if (Utils.isCollectable(object)) {
      return this._collect(object)
    }
    return noInteraction
  }
  show(interaction: Types.GameInteractionDef) {
    store.dispatch(regInteraction(interaction))
  }
  clear() {
    store.dispatch(clearInteractions())
  }
  protected _heroAttack(
    target: Types.Destroyable
  ): Types.GameInteractionProcess {
    return this._battle(this._hero, target)
    // return {
    //   type: Types.GameInteractionType.battle,
    //   subject: target.name,
    //   object: target.name,
    //   result: {
    //     value: target.health,
    //     max: target.healthMax,
    //   },
    // }
  }
  protected _unlock(object: Types.Unlockable): Types.GameInteractionDef {
    switch (object.name) {
      case Types.GameEntourageName.gate:
        let interaction = {
          type: Types.GameInteractionType.unlock,
          object: object.name,
          result: false,
        } as Types.GameInteractionDef
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

          const isExitLevelGate = 0 === gate.view?.position[1]
          /** убираем ворота */
          gateNearbyCells.forEach(cell => {
            cell.gameObjects.forEach(object => {
              if (object.name === Types.GameEntourageName.gate) {
                object.remove()
              }
            })
          })
          return !isExitLevelGate
            ? { ...interaction, ...{ result: true } }
            : finishInteraction

          // if (0 !== gate.view?.position[1]) {

          //   return { ...interaction, ...{ result: true } }
          // }
          // // gate in the level`s end
          // else return finishInteraction
        }
        this.show(interaction)
        return interaction
    }
    return noInteraction
  }
  protected _collect(object: Types.Collectable): Types.GameInteractionDef {
    switch (object.name) {
      case Types.GameItemName.key:
        this._hero.bag.push(object.remove())
        break

      case Types.GameItemName.coin:
        this._statistic.regItemCollect(object.remove())
        break
    }
    return {
      type: Types.GameInteractionType.collect,
      object: object.name,
    }
  }
  // protected _finish(): Types.GameInteractionDef {
  //   store.dispatch(finishLevel())
  //   return {
  //     type: Types.GameInteractionType.finish,
  //   }
  // }

  // TODO need to decompose
  protected _battle(
    attacker: Types.Attacker,
    attacked: Types.Destroyable
  ): Types.GameInteractionProcess {
    return new Promise(resolve =>
      this._waitEndOfAnimations(attacked).then(() => {
        const attack = attacker.attackDelegate.with(attacked)
        let attackResult = attack.result

        let defend: Types.DefendResult | null = null
        if (Utils.isDefendable(attacked)) {
          defend = attacked.defendDelegate.with(attackResult)
          attackResult = defend.result
        }

        let interaction: Types.GameInteractionDef<Types.UnitResource> = {
          type: Types.GameInteractionType.battle,
          subject: attacker.name,
          object: attacked.name,
          result: {
            value: attacked.health,
            max: attacked.healthMax,
          },
        }
        let damage: Types.DamageResult
        if (Utils.isHero(attacker)) {
          this.show(interaction)
          damage = attacked.damageDelegate.with(attackResult)
        }
        Promise.all([
          attack.process,
          defend ? defend.process : Promise.resolve(),
        ]).then(() => {
          if (!damage) {
            damage = attacked.damageDelegate.with(attackResult)
          }
          damage.process.then(() => {
            if (Utils.isHero(attacker)) {
              interaction = {
                ...interaction,
                ...{
                  result: {
                    value: attacked.health,
                    max: attacked.healthMax,
                  },
                },
              }
              this.show(interaction)
            }
            const isDestroyed = damage.result
            if (isDestroyed) {
              if (Utils.isMonster(attacked)) {
                this._statistic.regMonsterKill(attacked)
              }
              if (Utils.isHero(attacked)) {
                attacked.view.toggle(false)
                resolve(finishInteraction)
              } else attacked.remove()
            }
            resolve(interaction)
          })
        })
      })
    )
  }
  protected _waitEndOfAnimations(object: Types.GameObjectDef) {
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
  perform(
    subject: Types.GameObjectDef,
    object: Types.GameObjectDef
  ): Types.GameInteractionProcess | Types.GameInteractionDef {
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
    return noInteractionRes
  }
}
