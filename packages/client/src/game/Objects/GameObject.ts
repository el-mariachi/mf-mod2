import GameObjectSprite from '@game/core/spriteApi/GameObjectSprite'
import * as Types from '@game/core/types'

export type SpriteDescription = {
  source: string
  position: Types.Coords
}

export default class GameObject {
  name!: Types.GameObjectName
  spriteSource?: string
  sprite?: SpriteDescription
  motions?: Types.SpriteMotions & Types.CellSpriteMotions
  crossable = false
  static = true
  animated = false
  destroyable = false
}
