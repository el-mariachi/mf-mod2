import tileset from '@sprites/tileset.png'
import * as Types from '@type/game'

export default class GameObject implements Types.GameObjectDef {
  name!: Types.GameObjectName
  view!: Types.GameObjectViewDef
  spriteSrc = tileset
  spritePos?: Types.Coords
  motions?: Types.CellSpriteMotions
  cell?: Types.LevelMapCell
  crossable = false
  static = true
  animated = false
  destroyable = false // DEPRICATED, use Destroyable behavior delegate
  remove(): Types.GameObjectDef | null {
    this.view.toggle(false)
    return this.cell?.extract(this) ?? null
  }
}
