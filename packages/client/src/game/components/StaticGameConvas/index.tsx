import { FC } from 'react'
import Canvas from '@components/Canvas'
import { center } from '@utils/winsize'
import dummyLevelImg from '@images/game-lvl-dummy.png'

const dummyDrawer = (ctx: CanvasRenderingContext2D) => {
  const image = new Image()

  image.src = dummyLevelImg
  image.onload = function () {
    // ctx.drawImage(image, center.width - 200, 180)
    ctx.drawImage(
      image,
      center.width - image.width / 2,
      center.height - image.height / 2
    )
  }
}

export type StaticGameCanvasProps = Omit<CanvasProps, 'draw'> & {
  // ...
}
const StaticGameCanvas: FC<StaticGameCanvasProps> = props => {
  // ...

  return <Canvas draw={dummyDrawer} {...props} />
}

export default StaticGameCanvas
