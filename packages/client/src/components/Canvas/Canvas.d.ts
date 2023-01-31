type CanvasDrawingFunction = (ctx: CanvasRenderingContext2D) => void

type CanvasProps = {
  width: number
  height: number
  draw: CanvasDrawingFunction
}
