import tileset from '@sprites/tileset.png'
import * as Types from '@game/core/types'
import { View } from '@game/hoc/ViewFactory'
import UnitAI from '@game/core/AI/UnitAI'
import { Cell } from '@game/Controllers/MapController'

export default class GameObject {
  name!: Types.GameObjectName
  brain?: UnitAI
  view?: View
  spriteSrc: string = tileset
  spritePos?: Types.Coords
  motions?: Types.CellSpriteMotions
  get isNPC() {
    return (
      this.name in Types.GameUnitName && this.name !== Types.GameUnitName.hero
    )
  }
  cell?: Cell
  crossable = false
  static = true
  animated = false
  destroyable = false
}
