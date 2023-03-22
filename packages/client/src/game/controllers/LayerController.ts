import GameObject from '@game/objects/GameObject'
import ViewFactory from '@game/views/ViewFactory'
import * as Types from '@type/game'
import resources from '@game/mocks/resources'
import { addCoords, cellCoords2PixelCoords } from '@utils/game'
import { MAP_CELL } from '@constants/game'
import { BG_COLOR } from '@constants/ui'

type LayerProps = { name: string; zindex: string; size: Types.Size }

export class Layer {
  name: string
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  views: Types.GameObjectViewDef[] = []
  constructor({ name, zindex, size }: LayerProps) {
    this.name = name
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'fixed'
    this.canvas.style.zIndex = String(+zindex * 100)
    this.canvas.id = name
    this.canvas.width = size[0]
    this.canvas.height = size[1]
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }
  redraw(map: Types.LevelMap) {
    this.canvas.width = map.winSize[0]
    this.canvas.height = map.winSize[1]
    if ('static' == this.name) {
      this.drawBackground(map)
    }
    this.views.forEach(view => view.actualizeOnCanvas(map))
  }
  drawBackground(map: Types.LevelMap) {
    this.ctx.fillStyle = BG_COLOR
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    const patternSize: Types.Size = [MAP_CELL * 4, MAP_CELL * 3]
    const [mapWidth, mapheight] = map.size
    const patternCanvas = document.createElement('canvas')
    patternCanvas.width = patternSize[0]
    patternCanvas.height = patternSize[1]
    const patternContext = patternCanvas.getContext('2d')
    const [sx, sy] = cellCoords2PixelCoords([6, 0])
    const [dx, dy] = addCoords(map.coords, [0, 0])
    const img = resources.images['tileset']
    patternContext?.drawImage(img, sx, sy, ...patternSize, 0, 0, ...patternSize)
    const ptrn = this.ctx.createPattern(
      patternCanvas,
      'repeat'
    ) as CanvasPattern
    this.ctx.fillStyle = ptrn
    this.ctx.fillRect(dx, dy, mapWidth, mapheight)
  }
  /** используем фабрику ViewFabric для создания View игровых объектов и
   *  запускаем цикл анимации
   */
  drawViews(map: Types.LevelMap, tuples: [GameObject, Types.Coords][]) {
    const viewFactory = new ViewFactory(this.ctx, map)
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
  size: Types.Size
): LayerRecord {
  return layerNames.reduce<LayerRecord>((prev, name, i) => {
    const layer = new Layer({
      name,
      zindex: i.toString(),
      size,
    }) as Layer
    return { ...prev, [name]: layer }
  }, {})
}
