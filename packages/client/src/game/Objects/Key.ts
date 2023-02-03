import GameObject from './GameObject'
import itemsSrc from '@sprites/items.png'
import * as Types from '@game/core/types'
import itemsMotions from '@game/animations/items'

export default class Key extends GameObject {
  constructor() {
    super()
    this.name = Types.GameItemName.key
    this.sprite = { source: itemsSrc }
    this.motions = itemsMotions.key
    this.crossable = true
    this.static = true
    this.animated = true
    this.destroyable = true
  }
}
