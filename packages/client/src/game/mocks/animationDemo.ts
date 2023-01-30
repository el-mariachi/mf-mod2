import * as Types from '@game/core/types'
import * as Behaviors from '@game/animations/behavior'
import createUnitView from '@game/core/views/createUnitView'
import createAnimatedView from '@game/core/views/createAnimatedView'
const STEP_DELAY = 750

function makeStep(animation: Types.SpriteAnimationProcess) {
  return new Promise<Types.SpriteAnimationParams | null>(resolve => {
    setTimeout(
      () => animation.then(result => resolve(result.params)),
      STEP_DELAY
    )
  })
}
export default function spritesAnimationDemo(ctx: CanvasRenderingContext2D) {
  const heroView = createUnitView(ctx, Types.GameUnitName.hero, [5, 10])
  const skeletonView = createUnitView(ctx, Types.GameUnitName.skeleton, [9, 10])
  const coinView = createAnimatedView(ctx, Types.GameItemName.coin, [10, 10])

  makeStep(heroView.do(Behaviors.move2right))
    .then(() => makeStep(heroView.do(Behaviors.move2right)))
    .then(() => makeStep(heroView.do(Behaviors.move2right)))
    .then(() => makeStep(skeletonView.do(Behaviors.attack2left)))
    .then(() => makeStep(heroView.do(Behaviors.attack2right)))
    .then(() => makeStep(skeletonView.do(Behaviors.death)))

  return [heroView, skeletonView, coinView]
}
