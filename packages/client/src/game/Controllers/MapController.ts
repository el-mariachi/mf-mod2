import GameObject from '@game/Objects/GameObject'
import GameObjects from '@game/Objects'
import level1 from '../Data/Levels/1.json'
import { LayerRecord } from './LayerController'
import * as Types from '@game/core/types'

/** ячейка игровой матрицы */
export class Cell {
  /** position = [row, col] */
  position: Types.Coords = [0, 0]
  gameObjects: GameObject[] = []
  constructor(gameObjects: GameObject[], position: Types.Coords) {
    this.gameObjects = gameObjects
    this.position = position
    this.gameObjects.forEach(object => (object.cell = this))
  }
  addObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject)
    gameObject.cell = this;
    return gameObject
  }
  extract(gameObject: GameObject): GameObject {
    const index = this.gameObjects.indexOf(gameObject)
    const element = this.gameObjects.splice(index, 1)[0]
    element.cell = undefined 
    return element;
  }
}

/** массив ячеек игровой матрицы, с методами группировки игровых объектов */
const Cells = class extends Array {
  _notAnimatedObjects = []
  filterObjects(condition: (object: GameObject) => boolean) {
    return this.reduce((prev, cell) => {
      cell.gameObjects.forEach((gameObject: GameObject) =>
        /** строки и колонки матрицы "map" обратно связны с координатами x,y [row:y, col:x]
         * поэтому gameObject position = [cell.position[1], cell.position[0]]
         */
        condition(gameObject)
          ? prev.push([gameObject, [cell.position[1], cell.position[0]]])
          : null
      )
      return prev
    }, [])
  }
  filterCellsByObject(condition: (object: GameObject) => boolean) {
    return this.filter(cell =>
      cell.gameObjects.some((object: GameObject) => condition(object))
    )
  }
  get hero() {
    return this.heroCell.gameObjects.find(
      (gameObject: GameObject) => gameObject.name === Types.GameUnitName.hero
    )
  }
  get heroCell() {
    return this.filterCellsByObject(
      (object: GameObject) => object.name === Types.GameUnitName.hero
    )[0]
  }
  get NPCCells() {
    return this.filterCellsByObject((object: GameObject) => object.isNPC)
  }
  get NPC() {
    return this.filterObjects((object: GameObject) => object.isNPC)
  }
  get notAnimatedObjectsTuple() {
    /** кеширование не анимированных сущностей */
    return this._notAnimatedObjects.length
      ? this._notAnimatedObjects
      : this.filterObjects(
          (gameObject: GameObject) => gameObject.animated === false
        )
  }
  get animatedObjectsTuple() {
    /** анимированные сущности могут исчезнуть с игрового поля, поэтому не кешируются */
    return this.filterObjects(
      (gameObject: GameObject) => gameObject.animated === true
    )
  }
}

const Matrix = class extends Array {
  nearbyCells(
    cell: Cell,
    radius: number = 1,
    direction: null | Types.AxisDirection = null
  ) {
    const [row, col] = cell.position
    let cells: Cell[] = []
    /** клетики по направлению  */
    if (direction) {
      do {
        let targetRow = row
        let targetCol = col
        switch (direction) {
          case Types.AxisDirection.left:
            targetCol -= 1
            break
          case Types.AxisDirection.right:
            targetCol += 1
            break
          case Types.AxisDirection.top:
            targetRow -= 1
            break
          case Types.AxisDirection.bottom:
            targetRow += 1
            break
        }
        cells.push(this[targetRow][targetCol])
      } while ((radius -= 1))
      return cells
    }
    /** клетки в радиусе */
    const startRowPos = row - radius < 0 ? 0 : row - radius
    const endRowPos = row + radius > this.length ? this.length : row + radius
    const startColPos = col - radius < 0 ? 0 : col - radius
    const endColPos =
      col + radius > this[0].length ? this[0].length : col + radius

    for (let i = startRowPos; i <= endRowPos; i += 1) {
      for (let j = startColPos; j <= endColPos; j += 1) {
        cells.push(this[i][j])
      }
    }
    return cells
  }
}

type LevelInstance = Array<Array<Array<number>>>

type MapControllerPropsType = {
  layers: LayerRecord
  level: number
  size: Types.Size
}

class MapController {
  map = new Matrix()
  cells = new Cells()
  level: LevelInstance
  levelN: number
  layers: LayerRecord
  constructor({ layers, level: levelN }: MapControllerPropsType) {
    this.layers = layers
    this.level = level1 as LevelInstance
    this.levelN = levelN
    this.init()
  }
  init() {
    /** создаем матрицу игрового поля, с ячейками Cell, содержащими игровые объекты */
    for (let row = 0; row < this.level.length; row++) {
      this.map[row] = []
      for (let col = 0; col < this.level[row].length; col++) {
        const item = this.level[row][col]
        /** в одной ячейке может находится несколько объектов, поэтому ячейка - это массив */
        const items = Array.isArray(item) ? item : [item]
        const objects = items.reduce<GameObject[]>((prev, id) => {
          const Entity = GameObjects[id]
          prev.push(new Entity())
          return prev
        }, [])

        const cell = new Cell(objects, [row, col])
        /** матрица в виде таблицы */
        this.map[row][col] = cell
        /** матрица в виде списка */
        this.cells.push(cell)
      }
    }
    const mapSize: [number, number] = [this.map.length, this.map[0].length]
    this.layers.static.drawBackground(...mapSize)
    /** draw([tuple : [gameObject, cellPosition]])
     * создаем View для каждого объекта и размещаем в слое в соответствии с его типом*/
    this.layers.static.draw(this.cells.notAnimatedObjectsTuple)
    this.layers.active.draw(this.cells.animatedObjectsTuple)
  }
}

export default MapController
