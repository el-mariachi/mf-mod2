import GameObject, { SpriteDescription } from './GameObject'
import tileset from '@sprites/dungeonTileset.png'
import * as Types from '@game/core/types'

export default class RightGateLeaf extends GameObject {
  name = Types.GameEntourageName.rightGateLeaf
  sprite = {source: tileset, position: [7,3]} as SpriteDescription
  crossable = false
  static = true
  animated = false
  destroyable = false
}
