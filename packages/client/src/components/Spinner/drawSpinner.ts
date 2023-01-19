import Sprite from '@game/Sprite'
import spinnerImg from '@images/spinner_sprite_50.png'

const spinner = new Sprite(
  spinnerImg,
  { x: 0, y: 0 },
  { x: 50, y: 50 },
  16,
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
)

type Entity = {
  pos: { x: number; y: number }
  sprite: Sprite
}

const entities = [
  {
    pos: { x: 0, y: 0 },
    sprite: spinner,
  },
]

let lastTime: number

type ReadyCallback = () => void

const resourceCache: Record<string, HTMLImageElement | undefined> = {}
const readyCallbacks: ReadyCallback[] = []

type AssetLoader<T = string> = (urlOrArr: T | T[]) => void

const isReady = (): boolean => {
  let ready = true
  Object.entries(resourceCache).forEach(([key, value]) => {
    if (Object.hasOwn(resourceCache, key) && !value) {
      ready = false
    }
  })
  return ready
}

const onReady = (cb: ReadyCallback) => {
  readyCallbacks.push(cb)
}

const _load = (url: string) => {
  if (resourceCache[url]) {
    return resourceCache[url]
  } else {
    const img = new Image()
    img.onload = () => {
      resourceCache[url] = img
      if (isReady()) {
        readyCallbacks.forEach(cb => {
          cb()
        })
      }
    }
    resourceCache[url] = undefined
    img.src = url
  }
}

const get = (url: string) => resourceCache[url]

const load: AssetLoader = urlOrArr => {
  if (Array.isArray(urlOrArr)) {
    urlOrArr.forEach(url => _load(url))
  } else {
    _load(urlOrArr)
  }
}

const resources = {
  load,
  get,
  onReady,
  isReady,
}
type GameResources = typeof resources

export type { GameResources }

let context: CanvasRenderingContext2D

const update = (dt: number) => {
  entities.forEach(ent => {
    ent.pos = {
      x:
        Math.floor(context.canvas.width / 2) -
        Math.floor(ent.sprite.size.x / 2),
      y:
        Math.floor(context.canvas.height / 2) -
        Math.floor(ent.sprite.size.y / 2),
    }
    ent.sprite.update(dt)
  })
}

const renderEnitity = (entity: Entity) => {
  context.save()
  context.translate(entity.pos.x, entity.pos.y)
  entity.sprite.render(context, resources.get)
  context.restore()
}

const renderEnitites = (list: Entity[]) => {
  list.forEach(entity => {
    renderEnitity(entity)
  })
}

const render = () => {
  const width = context.canvas.width
  const height = context.canvas.height
  context.fillStyle = '#25131a'
  context.fillRect(0, 0, width, height)
  renderEnitites(entities)
}

const main = () => {
  const now = performance.now()
  const dt = (now - lastTime) / 1000.0

  update(dt)
  render()

  lastTime = now
  requestAnimationFrame(main)
}

const init = () => {
  // reset()
  lastTime = performance.now()
  main()
}

const drawSpinner: CanvasDrawingFunction = ctx => {
  console.log('drawSpinner')
  context = ctx
  resources.load([spinnerImg])
  resources.onReady(init)
}

export { drawSpinner }
