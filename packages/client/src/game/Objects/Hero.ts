import GameObject from '@game/objects/GameObject'
import * as Types from '@type/game'
import heroSrc from '@sprites/hero.png'
import { heroMotions } from '@game/animations/hero'
import UnitView from '@game/views/UnitView'
import { defineDirection } from '@utils/game'

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
}
