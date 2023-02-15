export type ProgressBarProps = {
  ctx: CanvasRenderingContext2D | null
  x: number
  y: number
  width: number
  heigth: number
  color: string
}
export class ProgressBar {
  private _ctx: CanvasRenderingContext2D | null
  private _x: number
  private _y: number
  private _width: number
  private _height: number
  private _color: string
  constructor(options: ProgressBarProps) {
    this._ctx = options.ctx
    this._x = options.x
    this._y = options.y
    this._width = options.width
    this._height = options.heigth
    this._color = options.color
  }
  private _drawContainer() {
    if (this._ctx) {
      this._ctx.strokeStyle = this._color
      this._ctx.strokeRect(this._x, this._y, this._width, this._height)
    }
  }
  private _drawRect(x: number, y: number) {
    if (this._ctx) {
      this._ctx.fillStyle = this._color
      this._ctx.fillRect(x, y, this._height, this._height)
    }
  }
  private _showAnimation() {
    let delta = 0
    const id = setInterval(() => {
      this._drawRect(this._x + delta, this._y)
      delta += this._height
      if (delta >= this._width) {
        clearInterval(id)
      }
    }, 400)
  }
  draw() {
    this._drawContainer()
    this._showAnimation()
  }
}
