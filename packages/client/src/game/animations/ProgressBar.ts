export class ProgressBar {
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    heigth: number,
    color: string
  ) {
    this.ctx.strokeRect(centerWidth - 80, centerHeight + 140, 165, 15)
    ctx.fillStyle = 'white'
    ctx.fillRect(centerWidth - 80, centerHeight + 140, 15, 15)
  }
}
