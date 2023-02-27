import * as Types from '@type/game'
import { emptyAnimationProcess } from '@constants/game'

export default class Defence implements Types.DefendBehavior {
  constructor(protected _subject: Types.Defendable) {}
  with(attack: Types.AttackDef) {
    let behavior
    if (this._subject?.defend) {
      behavior = this._subject.defend(attack)
    } else {
      const { points: attackPoints } = attack

      attack.points = this._calcPoints(attackPoints)

      behavior = {
        process: emptyAnimationProcess, // dnt have defence animation
        result: attack,
      } as Types.DefendResult
    }
    this._subject.curBehavior = behavior
    return behavior
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
    if (successDefenceChance >= Math.random()) {
      points += attackPoints * successDefenceLevel
    }
    return attackPoints - Math.round(points)
  }
}
