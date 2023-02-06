import GameObject from './GameObject'
import itemsSrc from '@sprites/items.png'
import * as Types from '@game/core/types'
import itemsMotions from '@game/animations/items'

export default class Coin extends GameObject {
  name = Types.GameItemName.coin
  spriteSrc: string = itemsSrc
  motions = itemsMotions.coin
  crossable = true
  static = true
  animated = true
  destroyable = true
}
