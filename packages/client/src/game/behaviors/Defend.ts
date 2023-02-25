import * as Types from '@type/game'
import { defineDirection } from '@utils/game'
import { emptyAnimationProcess } from '@constants/game'

export default class Defend implements Types.DefendBehavior {
  constructor(protected _subject: Types.Defendable) {}
  with(attack: Types.AttackDef) {
    const { points: attackPoints, attacker } = attack

    if (this._subject?.defend) {
      return this._subject.defend(attack)
    } else {
      const dir: Types.AxisDirection = defineDirection(
        this._subject.cell.position,
        // TODO opposite direction ?
        attacker.cell.position
      )
      const behavior = {
        type: Types.DamageMotionType.damage,
        dir,
      } as Types.UnitBehaviorDef

      attack.points = this._calcPoints(attackPoints)

      return {
        process: this._subject.view.do?.(behavior) ?? emptyAnimationProcess,
        result: attack,
      } as Types.DefendResult
    }
  }
  protected _calcPoints(attackPoints: number) {
    const { stamina } = this._subject
    let { successDefenceChance = 0, successDefenceLevel = 0 } = this._subject

    successDefenceChance = Math.abs(successDefenceChance)
    if (successDefenceChance > 1) {
      successDefenceChance = 1
    }
    successDefenceLevel = Math.abs(successDefenceLevel)
    if (successDefenceLevel > 1) {
      successDefenceLevel = 1
    }

    let points = stamina
    if (Math.random() >= successDefenceChance) {
      points += attackPoints * successDefenceLevel
    }

    return Math.round(points)
  }
}
