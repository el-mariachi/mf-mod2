import GameObject, { CoordinateType, SizeType } from '@game/Objects/GameObject'

type LayerProps = { name: string; zindex: string } & SizeType

class Layer {
  name: string
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor({ name, zindex, width, height }: LayerProps) {
    this.name = name
    this.canvas = document.createElement('canvas')
    this.canvas.style.zIndex = zindex
    this.canvas.id = name
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    if (this.name === 'static') {
      this.ctx.fillStyle = 'black'
      this.ctx.fillRect(0, 0, width, height)
    }
  }
  render(object: GameObject, position: CoordinateType) {
    const image = new Image()
    image.src = object.sprite.url
    image.onload = () => {
      const {
        position: { x, y },
        size: { width, height },
      } = object.sprite
      this.ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        position.x,
        position.y,
        16,
        16
      )
    }
  }
}

export default Layer
