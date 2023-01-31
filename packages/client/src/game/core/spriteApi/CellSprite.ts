import * as Types from '@game/core/types'
import { SPRITE_SIZE } from '@game/core/constants'
import Sprite from '@game/core/spriteApi/Sprite'
import {
  cellCoords2PixelCoords,
  cells2pixels,
  mapCoords,
  nextCoordsByVector,
  relCoords,
} from '@game/utils'

export default class CellSprite extends Sprite {
  constructor(
    ctx: CanvasRenderingContext2D,
    atlas: Types.SpriteAtlas,
    initGeometry: Types.CellSpriteGeometry,
    motions?: Types.CellSpriteMotions,
    initAnimation?: Types.CellSpriteAnimationParams
  ) {
    const { position, originPosition } = initGeometry

    const origin = originPosition
      ? {
          position: cellCoords2PixelCoords(originPosition),
          size: SPRITE_SIZE,
        }
      : null

    const cellInitGeometry = {
      position: relCoords(mapCoords(), cellCoords2PixelCoords(position)),
      size: SPRITE_SIZE,
      origin,
    }

    let resMotions: Types.SpriteMotions | undefined
    if (motions) {
      resMotions = {} as Types.SpriteMotions
      Object.entries(motions).forEach(([motionType, motionParams]) => {
        ;(resMotions as Types.SpriteMotions)[motionType as Types.MotionType] = {
          origin: {
            position: cellCoords2PixelCoords(motionParams.originPosition),
            size: SPRITE_SIZE,
          },
          frames: motionParams.frames,
        }
      })
    }
    super(ctx, atlas, cellInitGeometry, resMotions, initAnimation)
  }
  set cellDefaultOrigin(nextDefOriginPos: Types.Coords | null) {
    this._defaultOrigin = nextDefOriginPos
      ? {
          position: cellCoords2PixelCoords(nextDefOriginPos),
          size: SPRITE_SIZE,
        }
      : null
  }
  set cellGeometry(nextGeometry: Partial<Types.CellSpriteGeometry>) {
    if (nextGeometry.position) {
      this._geometry.position = relCoords(
        mapCoords(),
        cellCoords2PixelCoords(nextGeometry.position)
      )
    }
    if ('originPosition' in nextGeometry) {
      const { originPosition } = nextGeometry
      const origin = originPosition
        ? {
            position: cellCoords2PixelCoords(originPosition),
            size: SPRITE_SIZE,
          }
        : null
      this._geometry.origin = origin
    }
  }
  animate(params: Types.CellSpriteAnimationParams | null) {
    if (params) {
      if (params.to) {
        if (!Array.isArray(params.to)) {
          params.to.length = cells2pixels(params.to.length)
          params.to = nextCoordsByVector(
            this._geometry.position,
            params.to
          ) as Types.Coords
        } else
          params.to = relCoords(
            mapCoords(),
            cellCoords2PixelCoords(params.to)
          ) as Types.Coords
      }

      if (params.playMotion) {
        const { motion } = params.playMotion
        if (typeof motion == 'object' && 'frames' in motion) {
          params.playMotion.motion = {
            originPosition: motion.originPosition,
            origin: {
              position: motion.originPosition,
              size: SPRITE_SIZE,
            },
            frames: motion.frames,
          }
        }
      }
    }
    return super.animate(params) as Types.CellSpriteAnimationProcess
  }
}
