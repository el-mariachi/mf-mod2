import GameObject, { SpriteDescription } from '@game/Objects/GameObject'
import * as Types from '@game/core/types'
import heroSrc from '@sprites/hero.png'
import { heroMotions } from '@game/animations/hero'

export default class Hero extends GameObject {
  name = Types.GameUnitName.hero
  sprite = { source: heroSrc } as SpriteDescription
  motions = heroMotions
  crossable = false
  static = false
  animated = true
  destroyable = true
}
