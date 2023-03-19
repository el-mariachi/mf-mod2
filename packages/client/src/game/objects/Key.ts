import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'
import itemsMotions from '@game/animations/items'

export default class Key extends GameObject {
  name = Types.GameItemName.key
  spriteSrc = resources.images['items'].src
  motions = itemsMotions.key
  crossable = false
  static = true
  animated = true
  destroyable = true
}
