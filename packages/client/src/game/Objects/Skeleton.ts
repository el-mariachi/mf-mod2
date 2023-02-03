import GameObject from '@game/Objects/GameObject'
import * as Types from '@game/core/types'
import skeletonSrc from '@sprites/skeleton.png'
import { skeletonMotions } from '@game/animations/skeleton'

export default class Skeleton extends GameObject {
  constructor() {
    super()
    this.name = Types.GameUnitName.skeleton
    this.sprite = {source:skeletonSrc}
    this.motions = skeletonMotions
    this.crossable = false
    this.static = false
    this.animated = true
    this.destroyable = true
  }
}
