import * as Types from '@type/game'
import GameObjectSprite from '@game/sprite/GameObjectSprite'
import AnimatableView from '@game/views/AnimatableView'
import getAnimatedBehavior, * as Behaviors from '@game/behaviors'
import { DEF_FRAME_PER_SECOND_SPEED } from '@constants/game'

export default class UnitView extends AnimatableView {
  constructor(
    sprite: GameObjectSprite,
    position?: Types.Coords,
    initBehavior: Types.UnitBehaviorDef = Behaviors.look2bottom
  ) {
    super(sprite, position)
    this.do(initBehavior, false)
  }
  do(
    behavior: Types.UnitBehaviorDef,
    thenIdle = true,
    speed = DEF_FRAME_PER_SECOND_SPEED,
    quantity?: number
  ) {
    const { type, dir } = behavior
    quantity = quantity ? Math.abs(Math.round(quantity)) : 0

    const animation = getAnimatedBehavior(behavior)
    if (quantity) {
      if (animation?.to?.length) {
        animation.to.length *= quantity
      } else if (animation?.duration) {
        animation.duration *= quantity
      }
    }
    // TODO temporary hack, we need define animation params such as speed in getAnimatedBehavior. SEE mocks/SmartSkeleton
    if (animation.playMotion && speed > 0) {
      animation.playMotion.speed = speed
    }
    return this._sprite.animate(animation).then(res => {
      if (thenIdle) {
        const idleBehavior =
          dir && dir in Types.AxisDirection
            ? Behaviors[`look2${dir}` as Types.IdleMotionType]
            : Behaviors.idle

        const idleAnimation = getAnimatedBehavior(idleBehavior)
        delete idleAnimation.duration // make idle infinite, until next step
        this._sprite.animate(idleAnimation)
      }
      return res
    })
  }
}
