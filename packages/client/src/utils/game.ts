import { MAP_CELL } from '@constants/game'
import * as Types from '@type/game'
import { roundArrValues, createRangeKeeper } from '@utils/index'
import { center } from '@utils/winsize'

export const cellCoords2PixelCoords = (coords: Types.Coords) =>
  coords.map(coord => cells2pixels(coord)) as Types.Coords
export const pixelCoords2CellCoords = (coords: Types.Coords) =>
  coords.map(coord => pixels2Cells(coord)) as Types.Coords
export const cells2pixels = (cells: number) => cells * MAP_CELL
export const pixels2Cells = (pixels: number) => Math.floor(pixels / MAP_CELL)
export const nextCoordsByVector = (
  rel: Types.Coords,
  vector: Types.AxisVector
) => {
  const nextCoords = [...rel]
  const { direction } = vector
  let { length } = vector

  if (direction in Types.Axis) {
    switch (direction) {
      case Types.Axis.vertical:
        nextCoords[1] += length
        break

      case Types.Axis.horizontal:
        nextCoords[0] += length
        break
    }
  } else {
    length = Math.abs(length)

    switch (direction) {
      case Types.AxisDirection.top:
        nextCoords[1] -= length
        break

      case Types.AxisDirection.right:
        nextCoords[0] += length
        break

      case Types.AxisDirection.bottom:
        nextCoords[1] += length
        break

      case Types.AxisDirection.left:
        nextCoords[0] -= length
        break
    }
  }
  return nextCoords
}
export const addCoords = (coords: Types.Coords, add: Types.Coords) =>
  [coords[0] + add[0], coords[1] + add[1]] as Types.Coords
export const subtractCoords = (coords: Types.Coords, subtract: Types.Coords) =>
  [coords[0] - subtract[0], coords[1] - subtract[1]] as Types.Coords
// DEPRECATED relCoords
export const relCoords = (rel: Types.Coords, coords: Types.Coords) =>
  addCoords(rel, coords)
export const isCoordsEqual = (coordsA: Types.Coords, coordsB: Types.Coords) =>
  coordsA[0] == coordsB[0] && coordsA[1] == coordsB[1]
export const calcSpeed = (
  coordsA: Types.Coords,
  coordsB: Types.Coords,
  duration: number
) =>
  [
    calcLineSpeed(coordsA[0], coordsB[0], duration),
    calcLineSpeed(coordsA[1], coordsB[1], duration),
  ] as Types.CoordsSpeed
export const calcLineSpeed = (
  coordA: number,
  coordB: number,
  duration: number
) => (duration ? (coordB - coordA) / duration : 0)
export const calcMoveCoords = (
  rel: Types.Coords,
  speed: Types.CoordsSpeed,
  duration: number
) =>
  [
    calcLineMoveCoord(rel[0], speed[0], duration),
    calcLineMoveCoord(rel[1], speed[1], duration),
  ] as Types.Coords
export const calcLineMoveCoord = (
  rel: number,
  speed: number,
  duration: number
) => rel + speed * duration
export const roundCoords = (coords: Types.Coords) =>
  roundArrValues<Types.Coords>(coords)
// TODO temporary hack for mapSize definition
export const mapSize = () => [384, 672] as Types.Size
export const mapCellSize = () => pixelCoords2CellCoords(mapSize()) as Types.Size
export const mapCoords = () =>
  roundCoords([
    center.width - mapSize()[0] / 2,
    center.height - mapSize()[1] / 2,
  ])
export const onCanvasCoords = (onMapCoords: Types.Coords) =>
  addCoords(onMapCoords, mapCoords())
export const onMapCoords = (onCanvasCoords: Types.Coords) =>
  subtractCoords(onCanvasCoords, mapCoords())
export const coords2rowcol = ([x, y]: Types.Coords) => [y, x] as Types.Coords
export const rowcol2coords = ([row, col]: Types.Coords) =>
  [col, row] as Types.Coords // the same operation as above, just for semantic
export const defineAxisDir = (curPos: Types.Coords, nextPos: Types.Coords) => {
  if (isCoordsEqual(curPos, nextPos)) return null

  const [curX, curY] = curPos
  const [nextX, nextY] = nextPos

  let dir: Types.AxisDirection | null = null
  if (curX == nextX) {
    dir = curY > nextY ? Types.AxisDirection.top : Types.AxisDirection.bottom
  } else if (curY == nextY) {
    dir = curX > nextX ? Types.AxisDirection.left : Types.AxisDirection.right
  }
  return dir
}
export const defineDir = (curPos: Types.Coords, nextPos: Types.Coords) => {
  const [curX, curY] = curPos
  const [nextX, nextY] = nextPos
  const horAxisDir = defineAxisDir([curX, 0], [nextX, 0])
  const vertAxisDir = defineAxisDir([0, curY], [0, nextY])

  return [horAxisDir, vertAxisDir] as Types.Direction
}
export const isDirectionsEqual = (
  directionA: Types.Direction,
  directionB: Types.Direction
) => {
  return directionA[0] === directionB[0] && directionA[1] === directionB[1]
}
export const isDestinationReached = (
  cuPos: Types.Coords,
  nextPos: Types.Coords,
  destPos: Types.Coords
) => {
  // destination reached when coords are equal or when direction changed (so we`re about passed through destination and miss it)
  return (
    isCoordsEqual(nextPos, destPos) ||
    !isDirectionsEqual(defineDir(cuPos, destPos), defineDir(nextPos, destPos))
  )
}
export const nearestCoords = (
  rel: Types.Coords,
  direction: Types.AxisDirection
) => nextCoordsByVector(rel, { direction, length: 1 }) as Types.Coords
export const actualizeCoords = (coords: Types.Coords, size = mapSize()) => {
  const horMapKeeper = createRangeKeeper(0, size[0])
  const vertMapKeeper = createRangeKeeper(0, size[1])
  return [horMapKeeper(coords[0]), vertMapKeeper(coords[1])] as Types.Coords
}
export const actualizeCellCoords = (
  coords: Types.Coords,
  size = mapCellSize()
) => {
  return actualizeCoords(coords, subtractCoords(size, [1, 1]))
}
export const isCoordsActual = (coords: Types.Coords) =>
  isCoordsEqual(coords, actualizeCellCoords(coords))
export const getArea = (rel: Types.Coords, size: number) => {
  size = Math.round(size)
  if (size <= 0) {
    size = 0
  }
  const areaSize = [size, size] as Types.Coords
  return [subtractCoords(rel, areaSize), addCoords(rel, areaSize)] as Types.Area
}
export const getMapArea = (levelMap: Types.LevelMap, area: Types.Area) => {
  let [areaFrom, areaTo] = area
  areaFrom = actualizeCellCoords(areaFrom)
  areaTo = actualizeCellCoords(areaTo)

  const [fromCol, frowRow] = areaFrom
  const [toCol, toRow] = areaTo
  const mapArea: Types.LevelMap = []
  for (let row = frowRow; row <= toRow; row++) {
    if (!mapArea[row]) {
      mapArea[row] = []
    }
    for (let col = fromCol; col <= toCol; col++) {
      mapArea[row][col] = levelMap[row][col]
    }
  }
  return mapArea
}
export const getMapCellsAround = (
  levelMap: Types.LevelMap,
  rel: Types.Coords,
  size: number
) => {
  if (!isCoordsActual(rel)) {
    return []
  }
  const area = getArea(rel, size)
  return getMapArea(levelMap, area)
    .flat(1)
    .filter(cell => !isCoordsEqual(rowcol2coords(cell.position), rel))
}
// DEPRICATED, duplicate defineDir above
export const defineDirection = (
  curPos: Types.Coords,
  nextPos: Types.Coords
) => {
  const [curRow, curCol] = curPos
  const [nextRow, nextCol] = nextPos

  let direction: Types.AxisDirection | null = null
  if (curCol == nextCol) {
    direction =
      curRow > nextRow ? Types.AxisDirection.top : Types.AxisDirection.bottom
  } else if (curRow == nextRow) {
    direction =
      curCol > nextCol ? Types.AxisDirection.left : Types.AxisDirection.right
  }
  return direction as Types.AxisDirection
}

export const isMovable = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Movable => 'moveDelegate' in gameObject
export const isAttacker = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Attacker => 'attackDelegate' in gameObject
export const isDefendable = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Defendable => 'defendDelegate' in gameObject
export const isDestroyable = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Destroyable => 'damageDelegate' in gameObject

export const isCollectable = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Collectable =>
  Types.GameItemName.key == gameObject.name ||
  Types.GameItemName.coin == gameObject.name
export const isUnlockable = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Unlockable =>
  Types.GameEntourageName.gate == gameObject.name

export const isUnit = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Unit => 'active' in gameObject
export const isNpc = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Npc => 'brain' in gameObject
export const isWarrior = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Warrior =>
  isNpc(gameObject) &&
  isMovable(gameObject) &&
  isAttacker(gameObject) &&
  isDefendable(gameObject) &&
  isDestroyable(gameObject)
export const isMonster = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Monster => isNpc(gameObject) && isAttacker(gameObject)
export const isHero = (
  gameObject: Types.GameObjectDef
): gameObject is Types.Hero => gameObject.name === Types.GameUnitName.hero

export const setActualResourceVal = (
  resource: Types.UnitResource,
  value: number
) => {
  const { min = 0, max } = resource
  return createRangeKeeper(min, max)(value)
}
export const initResource = (value = 0) => {
  return {
    value,
    max: value,
  } as Types.UnitResource
}

export const actualizePosition = (unit: Types.GameObjectDef) => {
  // prevent unit object cell coords and its view coords out of sync
  const cellPosition = rowcol2coords(unit.cell.position)
  const viewPosition = unit.view.position
  if (!isCoordsEqual(cellPosition, viewPosition)) {
    unit.view.position = cellPosition
  }
}
