import { FC } from 'react'
import Canvas from '@components/Canvas'
import { center } from '@utils/winsize'
import { GameItemName } from '@game/core/types'
import createItemView from '@game/core/views/createItemView'
import dummyLevelSrc from '@images/game-lvl-dummy.png'

const dummyDrawer = (ctx: CanvasRenderingContext2D) => {
  const dummyLevel = new Image()
  dummyLevel.src = dummyLevelSrc

  dummyLevel.onload = function () {
    ctx.drawImage(
      dummyLevel,
      center.width - dummyLevel.width / 2,
      center.height - dummyLevel.height / 2
    )

    const coinView = createItemView(ctx, GameItemName.coin, [5, 13])
    coinView.render()
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
