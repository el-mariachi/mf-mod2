import * as Types from '@type/game'
import { getBehaviorAnimatedProcess } from '@game/behaviors'
import { emptyAnimationProcess } from '@constants/game'

export default class Destruction implements Types.DamageBehavior {
  constructor(protected _subject: Types.Destroyable) {}
  with(damage: Types.AttackDef) {
    let behavior = {
      process: emptyAnimationProcess,
      result: false,
    } as Types.DamageResult

    const { points: damagePoints, attacker } = damage
    if (this._subject.isOnMap && attacker.isOnMap) {
      if (this._subject?.damage) {
        behavior = this._subject.damage(damage)
      } else {
        this._applyDamage(damagePoints)

        const hasDestroyed = this._hasDestroyed()
        const behaviorDef = hasDestroyed
          ? Types.DestructionMotionType.destruction
          : Types.DamageMotionType.damage

        const process = getBehaviorAnimatedProcess(
          behaviorDef,
          this._subject,
          attacker.cell as Types.LevelMapCell
        )
        behavior = {
          process,
          result: hasDestroyed,
        }
      }
    }
    return (this._subject.prevBehavior = behavior)
  }
  protected _applyDamage(damagePoints: number) {
    this._subject.health -= damagePoints
  }
  protected _hasDestroyed() {
    return this._subject.health <= 0
  }
}
