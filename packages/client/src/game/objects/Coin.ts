import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'
import itemsMotions from '@game/animations/items'

export default class Coin extends GameObject {
  name = Types.GameItemName.coin
  spriteSrc = resources.images['items'].src
  motions = itemsMotions.coin
  crossable = false
  static = true
  animated = true
  destroyable = true
}
