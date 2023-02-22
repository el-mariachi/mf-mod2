import * as Types from '@type/game'
import GameObjectView from '@game/views/GameObjectView'
import GameObjectSprite from '@game/sprite/GameObjectSprite'
import getAnimatedBehavior, { idle } from '@game/animations/behavior'

export default class AnimatableView
  extends GameObjectView
  implements Types.AnimatableOnCanvas
{
  constructor(
    sprite: GameObjectSprite,
    position?: Types.Coords,
    initAnimation: Types.CellSpriteAnimationParams = getAnimatedBehavior(idle)
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
