import * as Types from '@type/game'
import GameObjectSprite from '@game/sprite/GameObjectSprite'
import CellSprite from '@game/sprite/CellSprite'
import GameObject from '@game/objects/GameObject'
import UnitView from '@game/views/UnitView'
import GameObjectView from '@game/views/GameObjectView'
import AnimatableView from '@game/views/AnimatableView'

export default class ViewFactory {
  ctx: CanvasRenderingContext2D
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }
  createView(
    gameObject: GameObject,
    position: Types.Coords
  ): Types.GameObjectViewDef {
    const { spriteSrc, spritePos } = gameObject
    const spriteImage = new Image()
    spriteImage.src = spriteSrc

    const { name, animated, motions } = gameObject
    if (
      motions &&
      !(Types.IdleMotionType.idle in motions) &&
      Types.IdleMotionType.look2bottom in motions
    ) {
      // by default units look to bottom (where map`s begun) when idle
      motions[Types.IdleMotionType.idle] =
        motions[Types.IdleMotionType.look2bottom]
    }

    /** создаем View персонажей*/
    let view!: GameObjectView
    if (name in Types.GameUnitName) {
      const sprite = new GameObjectSprite(this.ctx, spriteImage, motions)
      const viewOpts = []
      switch (name) {
        case Types.GameUnitName.skeleton:
          viewOpts.push({
            [Types.MoveMotionType.move]: 22,
            [Types.AttackMotionType.attack]: 14,
          })
          break
      }
      view = new UnitView(sprite, position, ...viewOpts)
      /** создаем View анимированных предметов */
    } else if (animated) {
      const sprite = new GameObjectSprite(this.ctx, spriteImage, motions)
      view = new AnimatableView(sprite, position)
      /** создаем View неповижных предметов*/
    } else {
      const sprite = new CellSprite(this.ctx, spriteImage, {
        position: position,
        originPosition: spritePos as Types.Coords,
      })
      view = new GameObjectView(sprite, position)
    }
    gameObject.view = view
    return view
  }
}
