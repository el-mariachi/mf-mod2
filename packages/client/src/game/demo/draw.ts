let time = 0
const drawPulsingCircle = (ctx: CanvasRenderingContext2D, dt: number) => {
  time += dt
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(375 / 2, 667 / 2, 20 * Math.sin(time) ** 2, 0, 2 * Math.PI)
  ctx.fill()
}

export default drawPulsingCircle
