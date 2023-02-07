import GameObject from '@game/Objects/GameObject'
import * as Types from '@game/core/types'
import skeletonSrc from '@sprites/skeleton.png'
import { skeletonMotions } from '@game/animations/skeleton'

export default class Skeleton extends GameObject {
  name = Types.GameUnitName.skeleton
  spriteSrc: string = skeletonSrc
  motions = skeletonMotions
  crossable = false
  static = false
  animated = true
  destroyable = true
}
