import {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as GAME from '@game/core/constants'
import Canvas from '@components/Canvas'
import { height, width } from '@utils/winsize'
import { useFonts } from '@hooks/useFonts'

export const prepareSceneCanvas: CanvasDrawingFunction = ctx => {
  if (ctx) {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = GAME.BG_COLOR
    ctx.fillRect(0, 0, width, height)
  }
}
export type SceneCanvasProps = HTMLAttributes<HTMLCanvasElement> & CanvasProps
const SceneCanvas: FC<SceneCanvasProps> = ({
  draw: sceneDrawer,
  children: ui,
  ...attrs
}) => {
  const fontLoaded = useFonts(GAME.MINECRAFT_FONTS)
  const getSceneDrawer = useCallback(() => {
    return fontLoaded
      ? (ctx: CanvasRenderingContext2D) => {
          if (ctx) {
            prepareSceneCanvas(ctx)
            sceneDrawer(ctx)
          }
        }
      : (ctx: CanvasRenderingContext2D) => prepareSceneCanvas(ctx)
  }, [fontLoaded])

  return (
    <>
      <Canvas draw={getSceneDrawer()} {...attrs} />
      {ui}
    </>
  )
}
export default SceneCanvas
