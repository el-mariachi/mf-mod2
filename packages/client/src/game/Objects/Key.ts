import GameObject from './GameObject'
import itemsSrc from '@sprites/items.png'
import * as Types from '@type/game'
import itemsMotions from '@game/animations/items'

export default class Key extends GameObject {
  name = Types.GameItemName.key
  spriteSrc: string = itemsSrc
  motions = itemsMotions.key
  crossable = false
  static = true
  animated = true
  destroyable = true
}
