import GameObject, { SpriteDescription } from './GameObject'
import tileset from '@sprites/dungeonTileset.png'
import * as Types from '@game/core/types'

export default class LeftGateLeaf extends GameObject {
  name = Types.GameEntourageName.leftGateLeaf
  sprite = { source: tileset, position: [6, 3] } as SpriteDescription
  crossable = false
  static = true
  animated = false
  destroyable = false
}
