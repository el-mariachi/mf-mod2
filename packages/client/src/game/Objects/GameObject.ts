import tileset from '@sprites/tileset.png'
import * as Types from '@game/core/types'
import { View } from '@game/hoc/ViewFactory'


export default class GameObject {
  name!: Types.GameObjectName
  view?: View
  spriteSrc: string = tileset
  spritePos?: Types.Coords 
  motions?:  Types.CellSpriteMotions |  Types.SpriteMotions & Types.CellSpriteMotions
  crossable = false
  static = true
  animated = false
  destroyable = false
}
