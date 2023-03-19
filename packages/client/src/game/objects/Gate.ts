import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'

export default class Gate extends GameObject {
  name = Types.GameEntourageName.gate
  spriteSrc = resources.images['tileset'].src
  crossable = false
  static = true
  animated = true
  destroyable = false
}
