import { MAP_CELL } from '@game/core/constants'
import * as Types from '@game/core/types'
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
// DEPRICETED relCoords
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
export const defineDir = (curPos: Types.Coords, nextPos: Types.Coords) => {
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
  return actualizeCoords(coords, size)
}
