import { ProgressBarProps } from './ProgressBarProps'

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
  private _drawRect(x: number, y: number, width: number, height: number) {
    if (this._ctx) {
      this._ctx.fillStyle = this._color
      this._ctx.fillRect(x, y, height, width)
    }
  }
  draw() {
    this._drawContainer()
    this._drawRect(this._x, this._y, this._height, this._height)
  }
}
