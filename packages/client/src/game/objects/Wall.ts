import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'

export default class Wall extends GameObject {
  name = Types.GameEntourageName.wall
  spriteSrc = resources.images['tileset'].src
  spritePos = [8, 7] as Types.Coords
  crossable = false
  static = true
  animated = false
  destroyable = false
}
