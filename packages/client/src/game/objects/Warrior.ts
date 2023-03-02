import { Warrior } from '@type/game'
import Attack from '@game/behaviors/Attack'
import Movement from '@game/behaviors/Movement'
import Defence from '@game/behaviors/Defence'
import Destruction from '@game/behaviors/Destruction'
import { setActualResourceVal, initResource } from '@utils/game'
import _Unit from './Unit'

// abstract
export default class _Warrior extends _Unit implements Warrior {
  moveDelegate: Movement
  attackDelegate: Attack
  defendDelegate: Defence
  damageDelegate: Destruction
  protected _strength = 0
  protected _criticalAttackChance = 0
  protected _criticalAttackLevel = 0
  protected _stamina = 0
  protected _successDefenceChance = 0
  protected _successDefenceLevel = 0
  protected _healthResourse = initResource()

  constructor() {
    super()
    this.moveDelegate = new Movement(this)
    this.attackDelegate = new Attack(this)
    this.defendDelegate = new Defence(this)
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
    this._healthResourse.value = setActualResourceVal(
      this._healthResourse,
      value
    )
  }
  get healthMax() {
    return this._healthResourse.max
  }
}
