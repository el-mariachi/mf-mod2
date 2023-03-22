import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'

export default class TrapDoor extends GameObject {
  name = Types.GameEntourageName.wall
  spriteImage = resources.images['tileset']
  spritePos = [9, 3] as Types.Coords
  crossable = false
  static = true
  animated = false
  destroyable = false
}
