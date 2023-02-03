import GameObject from './GameObject'
import tileset from '@sprites/dungeonTileset.png'
import * as Types from '@game/core/types'

export default class Wall extends GameObject {
  constructor() {
    super()
    this.name = Types.GameEntourageName.wall
    this.sprite = { source: tileset, position: [1, 0] }
    this.crossable = false
    this.static = true
    this.animated = false
    this.destroyable = false
  }
}
