import GameObject from './GameObject'
import UnitView from '@game/views/UnitView'

// abstract
export default class Unit extends GameObject {
  declare view: UnitView
  static = false
  animated = true
  destroyable = true
}
