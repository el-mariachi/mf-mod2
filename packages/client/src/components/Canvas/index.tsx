import { FC } from 'react'
import { Draw } from './Canvas'
import useCanvas from '../../hooks/useCanvas'

type CanvasProps = {
  draw: Draw
  width: number
  height: number
}

const Canvas: FC<CanvasProps> = props => {
  const { draw, ...rest } = props
  const canvasRef = useCanvas(draw)

  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas
