import * as Types from '@game/core/types'
import GameObjectSprite from '@game/core/spriteApi/GameObjectSprite';
import AnimatableView from '@game/core/views/AnimatableView';
import getAnimatedBehavior, * as Behaviors from '@game/animations/behavior';

export default class UnitView extends AnimatableView
{
  constructor (
    sprite: GameObjectSprite, 
    position?: Types.Coords,
    initBehavior: Types.UnitBehaviorDef = Behaviors.look2bottom
  ) {
    super(sprite, position);
    this.do(initBehavior, false);
  }
  do (behavior: Types.UnitBehaviorDef, thenIdle = true, quantity?: number)
  {
    const {type, dir} = behavior;
    quantity = quantity ? Math.abs(Math.round(quantity)) : 0;

    const animation = getAnimatedBehavior(behavior)
    if (Types.MoveMotionType.move == type && quantity && animation?.to?.length)
    {
      animation.to.length *= quantity
    }
    return this._sprite.animate(animation).then(res => 
    {
      if (thenIdle)
      {
        let idleBehavior : Types.UnitBehaviorDef;

        if (dir && dir in Types.AxisDirection)
        {
          idleBehavior = dir && dir in Types.AxisDirection ? Behaviors[`look2${dir}` as Types.IdleMotionType] : Behaviors.idle
        }
        else
          idleBehavior = Behaviors.idle

        return this._sprite.animate(getAnimatedBehavior(idleBehavior))
      }
      return res;
    });
  }
}
