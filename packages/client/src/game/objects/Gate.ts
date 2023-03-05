import GameObject from './GameObject'
import tileset from '@sprites/tileset.png'
import * as Types from '@type/game'

export default class Gate extends GameObject {
  name = Types.GameEntourageName.gate
  spriteSrc = tileset
  crossable = false
  static = true
  animated = true
  destroyable = false
}
