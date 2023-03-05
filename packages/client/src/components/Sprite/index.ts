import type { GameResources } from '@components/Spinner/drawSpinner'

type Coordinates = {
  x: number
  y: number
}

type Direction = 'horizontal' | 'vertical'

class Sprite {
  private index = 0
  public done = false
  constructor(
    public url: string,
    public position: Coordinates,
    public size: Coordinates,
    public speed = 0,
    public frames: number[],
    public dir: Direction = 'horizontal',
    public once = false
  ) {}
  public update(dt: number) {
    this.index += this.speed * dt
  }
  render(ctx: CanvasRenderingContext2D, getterFn: GameResources['get']) {
    const img = getterFn(this.url)
    if (!img) {
      return
    }
    let frame
    if (this.speed > 0) {
      const max = this.frames.length
      const idx = Math.floor(this.index)
      frame = this.frames[idx % max]

      if (this.once && idx >= max) {
        this.done = true
        return
      }
    } else {
      frame = 0
    }
    let x = this.position.x
    let y = this.position.y

    if (this.dir === 'vertical') {
      y += frame * this.size.y
    } else {
      x += frame * this.size.x
    }
    ctx.drawImage(
      img,
      x,
      y,
      this.size.x,
      this.size.y,
      0,
      0,
      this.size.x,
      this.size.y
    )
  }
}

export default Sprite
