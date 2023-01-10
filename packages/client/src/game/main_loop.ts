import drawPulsingCircle from './demo/draw'

const update = (dt: number) => {
  // the following code has no meaning. it just fills the function body
  if (dt > 5) {
    console.log('update takes too long')
  }
}

let lastTime: number = Date.now()

const mainLoop = (ctx: CanvasRenderingContext2D) => {
  const main = () => {
    const now = Date.now()
    const dt = (now - lastTime) / 1000.0

    // update models
    update(dt)

    // rendering demo
    drawPulsingCircle(ctx, dt)

    lastTime = now
    requestAnimationFrame(main)
  }
  main()
}

export default mainLoop
