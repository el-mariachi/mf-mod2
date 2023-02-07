import { FC } from 'react'
// import animationDemo from '@game/mocks/cellSpritesAnimationDemo'
// import animationDemo from '@game/mocks/spritesAnimationDemo'
import animationDemo from '@game/mocks/animationDemo'
import AnimationCanvas, {
  AnimatedCanvasProps,
} from '@game/components/AnimationCanvas'

export type LiveGameCanvasProps = Omit<
  AnimatedCanvasProps,
  'animatedViewsGetter'
> & {
  //
}
const LiveGameCanvas: FC<LiveGameCanvasProps> = props => {
  return (
    <AnimationCanvas
      animatedViewsGetter={animationDemo}
      {...props}></AnimationCanvas>
  )
}
export default LiveGameCanvas
