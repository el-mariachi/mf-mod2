import GameObject, { GameObjectType } from './GameObject'
import { Sprite } from './GameObject'

export default class Wall extends GameObject {
  sprite: Sprite
  constructor() {
    super()
    this.type = GameObjectType.item
    this.crossable = false
    this.static = true
    this.animated = false
    this.destroyable = false
    this.sprite = {
      position: { x: 32, y: 0 },
      size: { width: 16, height: 16 },
      url: '/src/assets/images/Dungeon_Tileset.png',
    }
  }
}
