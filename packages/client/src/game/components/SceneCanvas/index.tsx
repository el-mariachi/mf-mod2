import { FC, HTMLAttributes, useCallback } from 'react'
import * as UI from '@constants/ui'
import Canvas from '@components/Canvas'
import { useFonts } from '@hooks/useFonts'

export type SceneCanvasProps = HTMLAttributes<HTMLCanvasElement> & CanvasProps
const SceneCanvas: FC<SceneCanvasProps> = ({
  draw: sceneDrawer,
  children: ui,
  width,
  height,
  ...attrs
}) => {
  const fontLoaded = useFonts(UI.MINECRAFT_FONTS)
  const prepareSceneCanvas: CanvasDrawingFunction = ctx => {
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = UI.BG_COLOR
      ctx.fillRect(0, 0, width, height)
    }
  }
  const getSceneDrawer = useCallback(() => {
    return fontLoaded
      ? (ctx: CanvasRenderingContext2D) => {
          if (ctx) {
            prepareSceneCanvas(ctx)
            sceneDrawer(ctx)
          }
        }
      : (ctx: CanvasRenderingContext2D) => prepareSceneCanvas(ctx)
  }, [fontLoaded, width, height])

  return (
    <>
      <Canvas
        draw={getSceneDrawer()}
        width={width}
        height={height}
        {...attrs}
      />
      {ui}
    </>
  )
}
export default SceneCanvas
