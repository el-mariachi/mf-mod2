import * as Types from '@type/game'
import GameObjectSprite from '@game/sprite/GameObjectSprite'
import AnimatableView from '@game/views/AnimatableView'
import Behaviors, { getViewBehaviorAnimationParams } from '@game/behaviors'
import { DEF_FRAME_PER_SECOND_SPEED } from '@constants/game'

export default class UnitView extends AnimatableView {
  constructor(
    sprite: GameObjectSprite,
    position?: Types.Coords,
    protected _animationsSpeed: {
      [key in Types.BehaviorMotion]?: number
    } = {},
    initBehavior: Types.ViewBehaviorDef = Behaviors.look2bottom
  ) {
    super(sprite, position)
    this.do(initBehavior)
  }
  do(behavior: Types.ViewBehaviorDef, thenIdle = true, quantity?: number) {
    const { dir, type } = behavior
    quantity = quantity ? Math.abs(Math.round(quantity)) : 0

    const animationParams = getViewBehaviorAnimationParams(behavior)
    if (quantity) {
      if (animationParams?.to?.length) {
        animationParams.to.length *= quantity
      } else if (animationParams?.duration) {
        animationParams.duration *= quantity
      }
    }
    if (animationParams.playMotion) {
      animationParams.playMotion.speed =
        type in this._animationsSpeed
          ? this._animationsSpeed[type]
          : DEF_FRAME_PER_SECOND_SPEED
    }
    return this._sprite.animate(animationParams).then(res => {
      if (thenIdle) {
        const idleBehavior =
          dir && dir in Types.AxisDirection
            ? Behaviors[`look2${dir}` as Types.IdleMotionType]
            : Behaviors.idle

        const idleAnimation = getViewBehaviorAnimationParams(idleBehavior)
        delete idleAnimation.duration // make idle infinite, until next step
        this._sprite.animate(idleAnimation)
      }
      return res
    }) as Types.AnimatedBehaviorProcess
  }
}
