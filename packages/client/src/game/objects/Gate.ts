import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'

export default class Gate extends GameObject {
  name = Types.GameEntourageName.gate
  spriteImage = resources.images['tileset']
  crossable = false
  static = true
  animated = true
  destroyable = false
}
