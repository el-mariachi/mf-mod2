import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'
import itemsMotions from '@game/animations/items'

export default class Coin extends GameObject {
  name = Types.GameItemName.chest
  spriteSrc = resources.images['items'].src
  motions = itemsMotions.chest
  crossable = true
  static = true
  animated = true
  destroyable = true
}
