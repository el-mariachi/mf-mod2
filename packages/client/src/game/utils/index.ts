import { MAP_CELL } from '@game/core/constants'
import * as Types from '@game/core/types'
import { roundArrValues } from '@utils-kit'
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
export const relCoords = (rel: Types.Coords, coords: Types.Coords) =>
  [rel[0] + coords[0], rel[1] + coords[1]] as Types.Coords
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
export const mapCoords = () =>
  roundCoords([center.width - 384 / 2, center.height - 672 / 2])
