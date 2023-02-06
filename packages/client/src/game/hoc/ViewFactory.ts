import UnitView from '@game/core/views/UnitView'
import GameObjectView from '@game/core/views/GameObjectView'
import AnimatableView from '@game/core/views/AnimatableView'
import * as Types from '@game/core/types'
import GameObjectSprite from '@game/core/spriteApi/GameObjectSprite'
import CellSprite from '@game/core/spriteApi/CellSprite'
import GameObject from '@game/Objects/GameObject'

export type View = UnitView | GameObjectView | AnimatableView

export default class ViewFactory {
  ctx: CanvasRenderingContext2D
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }
  createView(gameObject: GameObject, position: Types.Coords): View {
    const { spriteSrc, spritePos } = gameObject
    const spriteImage = new Image()
    spriteImage.src = spriteSrc

    /** создаем View персонажей*/
    if (gameObject.name in Types.GameUnitName) {
      const sprite = new GameObjectSprite(
        this.ctx,
        spriteImage,
        gameObject.motions
      )
      return new UnitView(sprite, position)

      /** создаем View анимировыннх предметов */
    } else if (gameObject.animated) {
      const sprite = new GameObjectSprite(
        this.ctx,
        spriteImage,
        gameObject.motions
      )
      return new AnimatableView(sprite, position)
    }

    /** создаем View неповижных предметов*/
    const sprite = new CellSprite(this.ctx, spriteImage, {
      position: position,
      originPosition: spritePos as Types.Coords,
    })
    const view = new GameObjectView(sprite, position)
    return view
  }
}
