import * as Types from '@type/game'
import { emptyAnimationProcess } from '@constants/game'

export default class Defence implements Types.DefendBehavior {
  constructor(protected _subject: Types.Defendable) {}
  with(attack: Types.AttackDef) {
    const { points: attackPoints, attacker } = attack
    let behavior = {
      process: emptyAnimationProcess,
      result: attack,
    } as Types.DefendResult
    if (this._subject.isOnMap && attacker.isOnMap) {
      if (this._subject?.defend) {
        behavior = this._subject.defend(attack)
      } else behavior.result.points = this._calcPoints(attackPoints)
    } else behavior.result.points = 0
    return (this._subject.prevBehavior = behavior)
  }
  protected _calcPoints(attackPoints: number) {
    if (attackPoints <= 0) {
      return 0
    }
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
