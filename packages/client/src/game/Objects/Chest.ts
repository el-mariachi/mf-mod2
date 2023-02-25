import GameObject from './GameObject'
import itemsSrc from '@sprites/items.png'
import * as Types from '@type/game'
import itemsMotions from '@game/animations/items'

export default class Coin extends GameObject {
  name = Types.GameItemName.chest
  spriteSrc = itemsSrc
  motions = itemsMotions.chest
  crossable = true
  static = true
  animated = true
  destroyable = true
}
