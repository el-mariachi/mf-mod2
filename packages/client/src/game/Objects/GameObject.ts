import tileset from '@sprites/tileset.png'
import * as Types from '@types/game'
import { View } from '@game/views/ViewFactory'
import UnitAI from '@game/ai/UnitAI'
import { Cell } from '@game/controllers/MapController'
import { defineAxisDir, defineDirection } from '@utils/game'
import UnitView from '@game/views/UnitView'

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
    // TODO there`s no decent animation or effect for now
    // const dir: Types.AxisDirection = defineDirection(
    //   attacker.cell.position,
    //   this.cell.position
    // )
    // const view = this.view as UnitView
    // return view.do({ type: Types.DamageMotionType.damage, dir })
    return Promise.resolve(null)
  }
  die(attacker: GameObject) {
    const dir: Types.AxisDirection = defineDirection(
      attacker.cell.position,
      this.cell.position
    )
    const view = this.view as UnitView
    return view
      .do({ type: Types.DeathMotionType.death, dir }, false)
      .then(() => {
        this.remove()
      })
  }
}
