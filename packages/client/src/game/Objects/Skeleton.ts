import GameObject from '@game/objects/GameObject'
import * as Types from '@type/game'
import skeletonSrc from '@sprites/skeleton.png'
import { skeletonMotions } from '@game/animations/skeleton'
import UnitView from '@game/views/UnitView'

export default class Skeleton extends GameObject {
  declare view: UnitView
  name = Types.GameUnitName.skeleton
  spriteSrc: string = skeletonSrc
  motions = skeletonMotions
  crossable = false
  static = false
  animated = true
  destroyable = true
}
