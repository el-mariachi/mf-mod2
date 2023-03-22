import GameObject from './GameObject'
import resources from '@game/mocks/resources'
import * as Types from '@type/game'
import itemsMotions from '@game/animations/items'

export default class Coin extends GameObject {
  name = Types.GameItemName.chest
  spriteImage = resources.images['items']
  motions = itemsMotions.chest
  crossable = true
  static = true
  animated = true
  destroyable = true
}
