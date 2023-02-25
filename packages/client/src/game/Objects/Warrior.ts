import { UnitResource, Warrior } from '@type/game'
import { setActualResourceVal } from '@utils/game'
import Attack from '@game/behaviors/Attack'
import Movement from '@game/behaviors/Movement'
import Defend from '@game/behaviors/Defend'
import Destruction from '@game/behaviors/Destruction'
import Unit from './Unit'

// abstract
export default class _Warrior extends Unit implements Warrior {
  moveDelegate: Movement
  attackDelegate: Attack
  defendDelegate: Defend
  damageDelegate: Destruction
  protected _strength = 0
  protected _criticalAttackChance = 0
  protected _criticalAttackLevel = 0
  protected _stamina = 0
  protected _successDefenceChance = 0
  protected _successDefenceLevel = 0
  protected _healthResourse = {
    value: 0,
    max: 0,
  } as UnitResource

  constructor() {
    super()
    this.moveDelegate = new Movement(this)
    this.attackDelegate = new Attack(this)
    this.defendDelegate = new Defend(this)
    this.damageDelegate = new Destruction(this)
  }
  get strength() {
    return this._strength
  }
  get criticalAttackChance() {
    return this._criticalAttackChance
  }
  get criticalAttackLevel() {
    return this._criticalAttackLevel
  }
  get stamina() {
    return this._stamina
  }
  get successDefenceChance() {
    return this._successDefenceChance
  }
  get successDefenceLevel() {
    return this._successDefenceLevel
  }
  get health() {
    return this._healthResourse.value
  }
  set health(value: number) {
    setActualResourceVal(this._healthResourse, value)
  }
}
