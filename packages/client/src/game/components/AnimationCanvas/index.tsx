import { FC } from 'react'
import { AnimatableOnCanvas } from '@game/core/types'
import Canvas from '@components/Canvas'
import { height, width } from '@utils/winsize'

export type animatableOnCanvasFabric = (
  ctx: CanvasRenderingContext2D
) => AnimatableOnCanvas[]

const getAnimationDrawer =
  (viewsFabric: animatableOnCanvasFabric) =>
  (ctx: CanvasRenderingContext2D) => {
    let lastAnimationTime = performance.now()

    const views = viewsFabric(ctx).filter(view => view.canvas == ctx)

    ;(function animationLoop() {
      const now = performance.now()
      const dt = (now - lastAnimationTime) / 1000

      ctx.clearRect(0, 0, width, height)

      views.forEach(view => {
        view.update(dt)
        view.render()
      })
      lastAnimationTime = now
      requestAnimationFrame(animationLoop)
    })()
  }

export type AnimatedCanvasProps = Omit<CanvasProps, 'draw'> & {
  animatedViewsGetter: animatableOnCanvasFabric
}
const AnimationCanvas: FC<AnimatedCanvasProps> = props => {
  const { animatedViewsGetter, ...rest } = props

  return <Canvas draw={getAnimationDrawer(animatedViewsGetter)} {...rest} />
}
export default AnimationCanvas
