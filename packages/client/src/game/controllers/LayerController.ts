import GameObject from '@game/objects/GameObject'
import ViewFactory from '@game/views/ViewFactory'
import * as Types from '@type/game'
import tileset from '@sprites/tileset.png'
import { relCoords, mapCoords, cellCoords2PixelCoords } from '@utils/game'
import { MAP_CELL } from '@constants/game'
import { BG_COLOR } from '@constants/ui'

type LayerProps = { name: string; zindex: string; size: Types.Size }

export class Layer {
  name: string
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  views: Types.GameObjectViewDef[] = []
  constructor({ name, zindex, size: [width, height] }: LayerProps) {
    this.name = name
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'fixed'
    this.canvas.style.zIndex = String(+zindex * 100)
    this.canvas.id = name
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }
  drawBackground(rows: number, columns: number) {
    this.ctx.fillStyle = BG_COLOR
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    const patternSize: [number, number] = [MAP_CELL * 4, MAP_CELL * 3]

    const img = new Image()
    img.src = tileset
    const patternCanvas = document.createElement('canvas')
    patternCanvas.width = patternSize[0]
    patternCanvas.height = patternSize[1]
    const patternContext = patternCanvas.getContext('2d')
    const [sx, sy] = cellCoords2PixelCoords([6, 0])
    const [dx, dy] = relCoords(mapCoords(), [0, 0])
    patternContext?.drawImage(img, sx, sy, ...patternSize, 0, 0, ...patternSize)
    const ptrn = this.ctx.createPattern(
      patternCanvas,
      'repeat'
    ) as CanvasPattern
    this.ctx.fillStyle = ptrn
    this.ctx.fillRect(dx, dy, columns * MAP_CELL, rows * MAP_CELL)
  }
  /** используем фабрику ViewFabric для создания View игровых объектов и
   *  запускаем цикл анимации
   */

  draw(tuples: [GameObject, Types.Coords][]) {
    const viewFactory = new ViewFactory(this.ctx)
    this.views = tuples.map(([gameObject, position]) => {
      const view = viewFactory.createView(gameObject, position)
      gameObject.view = view
      return view
    })

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
        if (view.update) {
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
