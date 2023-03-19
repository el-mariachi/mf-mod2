import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'
import itemsMotions from '@game/animations/items'

export default class Key extends GameObject {
  name = Types.GameItemName.bottle
  spriteSrc = resources.images['items'].src
  motions = itemsMotions.bottle
  crossable = true
  static = true
  animated = true
  destroyable = true
}
