import GameObject from './GameObject'
import tileset from '@sprites/tileset.png'
import * as Types from '@game/core/types'

export default class Gate extends GameObject {
  name = Types.GameEntourageName.leftGateLeaf
  spriteSrc = tileset
  crossable = false
  static = true
  animated = false
  destroyable = false
}
