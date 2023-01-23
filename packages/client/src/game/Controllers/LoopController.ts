export default class Loop {
  ctx: CanvasRenderingContext2D
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.init()
  }
  init() {
    let lastTime: number = Date.now();
    const main = () => {
      const now = Date.now()
      const dt = (now - lastTime) / 1000.0
  
      // update models
      update(dt)
  
    }
    main()
  }
}
