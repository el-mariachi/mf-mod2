import GameObject from '@game/objects/GameObject'
import gameObjects from '@game/objects'
// TODO need to load dynamically by levelNum from store
import level1 from '@game/data/levels/1/map.json'
import { LayerRecord } from './LayerController'
import * as Types from '@type/game'
import * as Utils from '@utils/game'
import { defaultWinSize } from '@constants/game'

/** ячейка игровой матрицы */
export class Cell implements Types.LevelMapCell {
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
    gameObject.cell = this
    return gameObject
  }
  extract(gameObject: GameObject): GameObject {
    const index = this.gameObjects.indexOf(gameObject)
    const element = this.gameObjects.splice(index, 1)[0]
    element.cell = undefined
    return element
  }
}
/** массив ячеек игровой матрицы, с методами группировки игровых объектов */
export const Cells = class extends Array implements Types.LevelMapCells {
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
    return this.heroCell.gameObjects.find((gameObject: GameObject) =>
      Utils.isHero(gameObject)
    )
  }
  get heroCell() {
    return this.filterCellsByObject((object: GameObject) =>
      Utils.isHero(object)
    )[0]
  }
  get NpcCells() {
    return this.filterCellsByObject((object: GameObject) => Utils.isNpc(object))
  }
  get Npc() {
    return this.filterObjects((object: GameObject) => Utils.isNpc(object))
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
/** игровая матрица */
export const Matrix = class extends Array implements Types.LevelMap {
  protected _winSize?: Types.Size
  // TODO use getMapCellsAround
  nearbyCells(
    cell: Types.LevelMapCell,
    radius = 1,
    direction: null | Types.AxisDirection = null
  ) {
    const [row, col] = cell.position
    const cells: Types.LevelMapCell[] = []
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
  set winSize(size: Types.Size) {
    this._winSize = size
  }
  get winSize() {
    return this._winSize ?? defaultWinSize
  }
  get rowsCount() {
    return this.length
  }
  get colsCount() {
    return this[0].length
  }
  get size() {
    return Utils.cellCoords2PixelCoords(this.cellSize) as Types.Size
  }
  get cellSize() {
    return [this.colsCount, this.rowsCount] as Types.Size
  }
  get coords() {
    const center = Utils.calcCenter(this.winSize)
    return Utils.roundCoords([
      center[0] - this.size[0] / 2,
      center[1] - this.size[1] / 2,
    ])
  }
  onCanvasCoords(onMapCoords: Types.Coords) {
    return Utils.addCoords(onMapCoords, this.coords)
  }
  onMapCoords(onCanvasCoords: Types.Coords) {
    return Utils.subtractCoords(onCanvasCoords, this.coords)
  }
  actualizeCoords(coords: Types.Coords, size = this.cellSize) {
    return Utils.actualizeCoords(coords, Utils.subtractCoords(size, [1, 1]))
  }
  isCoordsActual(coords: Types.Coords) {
    return Utils.isCoordsEqual(coords, this.actualizeCoords(coords))
  }
  getArea(area: Types.Area) {
    let [areaFrom, areaTo] = area
    areaFrom = this.actualizeCoords(areaFrom)
    areaTo = this.actualizeCoords(areaTo)

    const [fromCol, frowRow] = areaFrom
    const [toCol, toRow] = areaTo

    const mapArea: Types.LevelMap = new Matrix()
    for (let row = frowRow; row <= toRow; row++) {
      if (!mapArea[row]) {
        mapArea[row] = []
      }
      for (let col = fromCol; col <= toCol; col++) {
        mapArea[row][col] = this[row][col]
      }
    }
    return mapArea
  }
  getCellsAround(rel: Types.Coords, size: number) {
    if (!this.isCoordsActual(rel)) {
      return []
    }
    const area = Utils.getArea(rel, size)
    return this.getArea(area)
      .flat(1)
      .filter(
        cell => !Utils.isCoordsEqual(Utils.rowcol2coords(cell.position), rel)
      )
  }
  static initZeroMap() {
    const zeroMap = new Matrix()
    zeroMap[0] = [new Cell([], [0, 0])]
    return zeroMap
  }
}
export const zeroLevelMap = Matrix.initZeroMap()

type LevelInstance = Array<Array<Array<number>>>

type MapControllerPropsType = {
  layers: LayerRecord
  level: number
}

class MapController {
  map = new Matrix()
  cells = new Cells()
  level: LevelInstance
  levelN: number
  layers: LayerRecord
  // TODO need to get level from store
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
          const Entity = gameObjects[id]
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
    this.layers.static.drawBackground(this.map)
    /** drawViews(map, [tuple : [gameObject, cellPosition]])
     * создаем View для каждого объекта и размещаем в слое в соответствии с его типом*/
    this.layers.static.drawViews(this.map, this.cells.notAnimatedObjectsTuple)
    this.layers.active.drawViews(this.map, this.cells.animatedObjectsTuple)
  }
}

export default MapController
