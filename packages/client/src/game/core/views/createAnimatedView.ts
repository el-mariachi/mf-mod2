import * as Types from '@game/core/types'
import AnimatableView from '@game/core/views/AnimatableView'
import GameObjectSprite from '@game/core/spriteApi/GameObjectSprite'
import itemsMotions from '@game/animations/items'
import imgResources from '@game/mocks/imgResources'

const createAnimatedView: Types.GameObjectViewFactory<AnimatableView> = (
  ctx,
  objectName,
  position
) => {
  let sprite
  switch (objectName) {
    case Types.GameItemName.coin:
    default:
      sprite = new GameObjectSprite(ctx, imgResources.items, itemsMotions.coin)
      break
  }
  return new AnimatableView(sprite as GameObjectSprite, position)
}

export default createAnimatedView
