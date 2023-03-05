import * as Types from '@type/game'
import GameObjectView from '@game/views/GameObjectView'
import GameObjectSprite from '@game/sprite/GameObjectSprite'
import Behaviors, { getViewBehaviorAnimationParams } from '@game/behaviors'

export default class AnimatableView
  extends GameObjectView
  implements Types.AnimatableOnCanvas
{
  constructor(
    sprite: GameObjectSprite,
    position?: Types.Coords,
    initAnimation: Types.BehaviorAnimationParams = getViewBehaviorAnimationParams(
      Behaviors.idle
    )
  ) {
    if (initAnimation) {
      sprite.animate(initAnimation)
    }
    super(sprite, position)
  }
  update(dt: number): void {
    this.sprite.update(dt)
  }
}
