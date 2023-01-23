import GameObject, { CoordinateType } from '@game/Objects/GameObject'
import gameObjectsEntries from '@game/Objects'
import level1 from '../Data/Levels/1.json'
import type Layer from './Layerontroller'
/*const levels: Record<string, unknown> = import.meta.glob(
  '/home/anri/Документы/mf-mod2/packages/client/src/game/Data/Levels/*.json'
)*/

class Cell {
  static width = 16
  static height = 16
  position: CoordinateType = {} as CoordinateType
  objects: Array<GameObject> = []
  constructor(gameObjects: Array<GameObject>, row: number, col: number) {
    this.objects = gameObjects
    this.position = { x: Cell.width * col, y: Cell.height * row }
  }
}
type LevelType = Array<Array<Array<number>>>

type MapControllerPropsType = {
  layers: Layer[]
  level: number
  width: number
  height: number
}

class MapController {
  map: Array<Array<Cell>> = []
  objects: Map<number, typeof GameObject>
  level: LevelType
  layers: Layer[]
  constructor({ layers, level, width, height }: MapControllerPropsType) {
    //this.level = Object.values(levels)[level - 1] as LevelType
    this.layers = layers
    this.level = level1 as LevelType
    this.objects = new Map(gameObjectsEntries)
    this.init()
  }
  init() {
    for (let row = 0; row < this.level.length; row++) {
      this.map[row] = []
      for (let col = 0; col < this.level[row].length; col++) {
        const item = this.level[row][col]
        const items = Array.isArray(item) ? item : [item]
        const objects = items.reduce<GameObject[]>((prev, id) => {
          const GameObjetClass = this.objects.get(id)
          if (GameObjetClass) {
            prev.push(new GameObjetClass())
          }
          return prev
        }, [])

        this.map[row][col] = new Cell(objects, row, col)
      }
    }
    this.render()
  }
  /* resize(width, height)  {
    this.render()
  }*/
  render() {
    const staticLayer = this.layers[0]
    const activeLayer = this.layers[1]

    this.map.forEach(row => {
      row.forEach(cell => {
        cell.objects.forEach(gameObject => {
          if (gameObject.static && !gameObject.animated) {
            if (staticLayer) staticLayer.render(gameObject, cell.position)
          } else {
            if (activeLayer) activeLayer.render(gameObject, cell.position)
            // this.loop.layers.active.drawImage(gameObject.spriteImg, ...cell.rect);
          }
        })
      })
    })
  }
}

export default MapController
