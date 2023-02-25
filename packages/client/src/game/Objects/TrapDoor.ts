import GameObject from './GameObject'
import tileset from '@sprites/tileset.png'
import * as Types from '@type/game'

export default class TrapDoor extends GameObject {
  name = Types.GameEntourageName.wall
  spriteSrc = tileset
  spritePos = [9, 3] as Types.Coords
  crossable = false
  static = true
  animated = false
  destroyable = false
}
