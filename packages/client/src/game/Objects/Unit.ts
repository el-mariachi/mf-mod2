import GameObject from './GameObject'
import UnitView from '@game/views/UnitView'
import { Unit, UnitBehaviorResult } from '@type/game'
import { isDestroyable } from '@utils/game'

// abstract
export default class _Unit extends GameObject implements Unit {
  declare view: UnitView
  static = false
  animated = true
  destroyable = true
  curBehavior: UnitBehaviorResult | null = null
  get active(): boolean {
    return !!(this.cell && (!isDestroyable(this) || this.health))
  }
}
