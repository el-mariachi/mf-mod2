import GameObject from './GameObject'
import tileset from '@sprites/tileset.png'
import * as Types from '@game/core/types'

export default class Wall extends GameObject {
  name = Types.GameEntourageName.wall
  spriteSrc = tileset
  spritePos = [8, 7] as Types.Coords
  crossable = false
  static = true
  animated = false
  estroyable = false
}
