import * as Types from '@type/game'
import { store } from '@store/index'
import { selectHealth } from '@store/selectors'
import { updateHealthByAmount } from '@store/slices/hero'
import _Warrior from './Warrior'

// abstract
export default class _Hero extends _Warrior implements Types.Hero {
  name: Types.GameUnitName.hero = Types.GameUnitName.hero
  heroClass!: Types.HeroClass
  bag: Types.GameObjectDef[] = []
  protected _level = 1
  get health() {
    return selectHealth(store.getState()).health
  }
  set health(value: number) {
    store.dispatch(updateHealthByAmount(value - this.health))
  }
  get level() {
    return this._level
  }
  levelUp() {
    this._level++
  }
}
