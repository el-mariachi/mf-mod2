import GameObject from '@game/Objects/GameObject'
import * as Types from '@game/core/types'
import skeletonSrc from '@sprites/skeleton.png'
import { skeletonMotions } from '@game/animations/skeleton'
import UnitView from '@game/core/views/UnitView'

export default class Skeleton extends GameObject {
  declare view:UnitView
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
