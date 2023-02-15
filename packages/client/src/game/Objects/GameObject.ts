import tileset from '@sprites/tileset.png'
import * as Types from '@game/core/types'
import { View } from '@game/hoc/ViewFactory'
import UnitAI from '@game/core/AI/UnitAI'
import { Cell } from '@game/Controllers/MapController'
import { defineDir, defineDirection } from '@game/utils'
import UnitView from '@game/core/views/UnitView'

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
  cell!: Cell
  crossable = false
  static = true
  animated = false
  destroyable = false
  move(targetCell: Cell) {
    const dir: Types.AxisDirection = defineDirection(
      this.cell.position,
      targetCell.position
    )

    const gameObject = this.cell.extract(this)
    targetCell.addObject(gameObject)

    const behavior = {
      type: Types.MoveMotionType.move,
      dir,
    } as Types.UnitBehaviorDef
    const view = gameObject.view as UnitView
    return view.do(behavior)
  }
  remove() {
    this.view!.toggle(false)
    return this.cell!.extract(this)
  }
  attack(target: GameObject) {
    const dir: Types.AxisDirection = defineDirection(
      this.cell.position,
      target.cell.position
    )
    const view = this.view as UnitView
    return view.do({ type: Types.AttackMotionType.attack, dir })
  }
  defend(attacker: GameObject) {
    const dir: Types.AxisDirection = defineDirection(
      attacker.cell.position,
      this.cell.position
    )
    const view = this.view as UnitView
    return view.do({ type: Types.DamageMotionType.damage, dir })
  }
}
