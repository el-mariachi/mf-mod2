import GameObject from '@game/Objects/GameObject'
import ViewFactory, { View } from '@game/hoc/ViewFactory'
import GameObjectView from '@game/core/views/GameObjectView'
import * as Types from '@game/core/types'

type LayerProps = { name: string; zindex: string; size: Types.Size }

type AnimtedView = Exclude<View, GameObjectView>

export class Layer {
  name: string
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  views: View[] = []
  constructor({ name, zindex, size: [width, height] }: LayerProps) {
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
  /** используем фабрику ViewFabric для создания View игровых объектов и
   *  запускаем цикл анимации
   */

  draw(tuples: [GameObject, Types.Coords][]) {
    const viewFactory = new ViewFactory(this.ctx)
    this.views = tuples.map(([gameObject, position]) =>
      viewFactory.createView(gameObject, position)
    )

    if (this.name !== 'static') {
      this.startAnimationLoop()
    } else {
      this.views.forEach(view => {
        view.render() 
      })
    }
  }
  startAnimationLoop() {
    let lastAnimationTime = performance.now()
    const { ctx, canvas, views } = this

    ;(function animationLoop() {
      const now = performance.now()
      const dt = (now - lastAnimationTime) / 1000
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      views.forEach(view => {
        if ('update' in view) {
          view.update(dt)
          view.render()
        }
      })
      lastAnimationTime = now
      requestAnimationFrame(animationLoop)
    })()
  }
}

type layerName = string
export type LayerRecord = Record<layerName, Layer>

export function createLayers(
  layerNames: string[],
  [width, height]: Types.Size
): LayerRecord {
  return layerNames.reduce<LayerRecord>((prev, name, i) => {
    const layer = new Layer({
      name,
      zindex: i.toString(),
      size: [width, height],
    }) as Layer
    return { ...prev, [name]: layer }
  }, {})
}
