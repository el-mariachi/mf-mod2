import GameObject from '@game/Objects/GameObject'
import * as Types from '@game/core/types'
import heroSrc from '@sprites/hero.png'
import { heroMotions } from '@game/animations/hero'
import UnitView from '@game/core/views/UnitView'
import { defineDirection } from '@game/utils'

export default class Hero extends GameObject {
  declare view: UnitView
  bag: GameObject[] = []
  name = Types.GameUnitName.hero
  spriteSrc: string = heroSrc
  motions = heroMotions
  crossable = false
  static = false
  animated = true
  destroyable = true
  defend(attacker: GameObject) {
    const dir: Types.AxisDirection = defineDirection(
      this.cell.position,
      attacker.cell.position
    )
    const view = this.view as UnitView
    return view.do({ type: Types.DamageMotionType.damage, dir })
  }
}
