import * as Types from '@type/game'
import { getBehaviorAnimatedProcess } from '@game/behaviors'

export default class Destruction implements Types.DamageBehavior {
  constructor(protected _subject: Types.Destroyable) {}
  with(damage: Types.AttackDef) {
    let behavior
    if (this._subject?.damage) {
      behavior = this._subject.damage(damage)
    } else {
      const { points: damagePoints, attacker } = damage

      this._applyDamage(damagePoints)

      const hasDestroyed = this._hasDestroyed()
      const behaviorDef = hasDestroyed
        ? Types.DestructionMotionType.destruction
        : Types.DamageMotionType.damage
      const process = getBehaviorAnimatedProcess(
        behaviorDef,
        this._subject,
        attacker.cell
      )

      behavior = {
        process,
        result: hasDestroyed,
      }
    }
    this._subject.curBehavior = behavior
    return behavior
  }
  protected _applyDamage(damagePoints: number) {
    this._subject.health -= damagePoints
  }
  protected _hasDestroyed() {
    return this._subject.health <= 0
  }
}
