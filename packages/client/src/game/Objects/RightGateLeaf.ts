import GameObject from './GameObject'
import tileset from '@sprites/dungeonTileset.png'
import * as Types from '@game/core/types'

export default class RightGateLeaf extends GameObject {
  constructor() {
    super()
    this.name = Types.GameEntourageName.rightGateLeaf
    this.sprite = {source: tileset, position: [7,3]}
    this.crossable = false
    this.static = true
    this.animated = false
    this.destroyable = false
  }
}
