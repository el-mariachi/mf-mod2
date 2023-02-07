import GameObject from './GameObject'
import itemsSrc from '@sprites/items.png'
import * as Types from '@game/core/types'
import itemsMotions from '@game/animations/items'

export default class Key extends GameObject {
  name = Types.GameItemName.bottle
  spriteSrc: string = itemsSrc
  motions = itemsMotions.bottle
  crossable = true
  static = true
  animated = true
  destroyable = true
}
