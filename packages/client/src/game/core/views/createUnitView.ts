import * as Types from '@game/core/types'
import UnitView from '@game/core/views/UnitView'
import GameObjectSprite from '@game/core/spriteApi/GameObjectSprite'
import { heroMotions } from '@game/animations/hero'
import { skeletonMotions } from '@game/animations/skeleton'
import imgResources from '@game/mocks/imgResources'

const createUnitView: Types.GameObjectViewFactory<UnitView> = (
  ctx,
  objectName,
  position,
  initBehavior
) => {
  let sprite
  switch (objectName) {
    case Types.GameUnitName.hero:
      sprite = new GameObjectSprite(ctx, imgResources.hero, heroMotions)
      break

    case Types.GameUnitName.skeleton:
    default:
      sprite = new GameObjectSprite(ctx, imgResources.skeleton, skeletonMotions)
      break
  }
  return new UnitView(sprite as GameObjectSprite, position, initBehavior)
}

export default createUnitView
