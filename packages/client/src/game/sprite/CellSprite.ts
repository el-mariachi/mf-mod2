import * as Types from '@type/game'
import { SPRITE_SIZE } from '@constants/game'
import Sprite from '@game/sprite/Sprite'
import * as Utils from '@utils/game'

export default class CellSprite extends Sprite {
  protected _map: Types.LevelMap
  constructor(
    ctx: CanvasRenderingContext2D,
    atlas: Types.SpriteAtlas,
    map: Types.LevelMap,
    initGeometry: Types.CellSpriteGeometry,
    motions?: Types.CellSpriteMotions,
    initAnimation?: Types.CellSpriteAnimationParams
  ) {
    const { position, originPosition } = initGeometry

    const origin = originPosition
      ? {
          position: Utils.cellCoords2PixelCoords(originPosition),
          size: SPRITE_SIZE,
        }
      : null

    const cellInitGeometry = {
      position: map.onCanvasCoords(Utils.cellCoords2PixelCoords(position)),
      size: SPRITE_SIZE,
      origin,
    }
    let resMotions: Types.SpriteMotions | undefined
    if (motions) {
      resMotions = {} as Types.SpriteMotions
      Object.entries(motions).forEach(([motionType, motionParams]) => {
        ;(resMotions as Types.SpriteMotions)[motionType as Types.MotionType] = {
          origin: {
            position: Utils.cellCoords2PixelCoords(motionParams.originPosition),
            size: SPRITE_SIZE,
          },
          frames: motionParams.frames,
        }
      })
    }
    super(ctx, atlas, cellInitGeometry, resMotions, initAnimation)
    this._map = map
  }
  get cellPostion() {
    return Utils.pixelCoords2CellCoords(this._map.onMapCoords(this.position))
  }
  set cellDefaultOrigin(nextDefOriginPos: Types.Coords | null) {
    this._defaultOrigin = nextDefOriginPos
      ? {
          position: Utils.cellCoords2PixelCoords(nextDefOriginPos),
          size: SPRITE_SIZE,
        }
      : null
  }
  set cellGeometry(nextGeometry: Partial<Types.CellSpriteGeometry>) {
    if (nextGeometry.position) {
      this._geometry.position = this._map.onCanvasCoords(
        Utils.cellCoords2PixelCoords(nextGeometry.position)
      )
    }
    if ('originPosition' in nextGeometry) {
      const { originPosition } = nextGeometry
      const origin = originPosition
        ? {
            position: Utils.cellCoords2PixelCoords(originPosition),
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
          params.to.length = Utils.cells2pixels(params.to.length)
          params.to = Utils.nextCoordsByVector(
            this._geometry.position,
            params.to
          )
        } else
          params.to = this._map.onCanvasCoords(
            Utils.cellCoords2PixelCoords(params.to)
          )
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
