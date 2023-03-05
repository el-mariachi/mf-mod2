import * as Types from '@type/game'
import { store } from '@store/index'
import { selectHealth } from '@store/selectors'
import { updateHealth } from '@store/slices/hero'
import _Warrior from './Warrior'
import { muteRes } from '@utils/index'

// abstract
export default class _Hero extends _Warrior implements Types.Hero {
  name: Types.GameUnitName.hero = Types.GameUnitName.hero
  heroClass!: Types.HeroClass
  bag: Types.GameObjectDef[] = []
  prevInteractions: Types.GameInteractionProcess[] = []
  protected _level = 1
  get health() {
    return selectHealth(store.getState()).health
  }
  set health(value: number) {
    store.dispatch(updateHealth(value - this.health))
  }
  get healthMax() {
    return selectHealth(store.getState()).maxHealth
  }
  get level() {
    return this._level
  }
  levelUp() {
    this._level++
  }
  get prevStepProcess() {
    return Promise.all([
      ...this.prevInteractions,
      this.prevBehavior?.process,
    ]).then(muteRes)
  }
}
