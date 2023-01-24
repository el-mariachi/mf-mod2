import { FC } from 'react'
import { spritesAnimationDemo } from '@game/mocks/cellSpritesAnimationDemo'
import AnimationCanvas, { AnimatedCanvasProps } from '@game/components/AnimationCanvas';

export type LiveGameCanvasProps = Omit<AnimatedCanvasProps, 'animatedViewsFabric'> & {
  //
};
const LiveGameCanvas: FC<LiveGameCanvasProps> = props => 
{
  return <AnimationCanvas animatedViewsFabric={spritesAnimationDemo} {...props}></AnimationCanvas>
}
export default LiveGameCanvas
