import GameObject from './GameObject'
import itemsSrc from '@sprites/items.png'
import * as Types from '@game/core/types'
import itemsMotions from '@game/animations/items'

export default class Coin extends GameObject {
  constructor() {
    super()
    this.name = Types.GameItemName.coin
    this.sprite = { source: itemsSrc }
    this.motions = itemsMotions.coin
    this.crossable = true
    this.static = true
    this.animated = true
    this.destroyable = true
  }
}
