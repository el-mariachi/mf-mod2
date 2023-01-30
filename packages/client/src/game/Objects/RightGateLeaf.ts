import GameObject, { GameObjectType } from './GameObject'
import { Sprite } from './GameObject'

export default class LeftGateLeaf extends GameObject {
  sprite: Sprite
  constructor() {
    super()
    this.type = GameObjectType.item
    this.crossable = false
    this.static = true
    this.animated = false
    this.destroyable = false
    this.sprite = {
      position: { x: 7 * 16, y: 3 * 16 },
      size: { width: 16, height: 16 },
      url: '/src/assets/images/Dungeon_Tileset.png',
    }
  }
}
