import { SPRITE_SIZE } from '@game/core/constants'
import * as Types from '@game/core/types'
import { cellCoords2PixelCoords } from '@game/utils'

const coin = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 0],
    origin: {
      position: [0, 0],
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3],
  },
} as Types.SpriteMotions & Types.CellSpriteMotions // Types.SpriteMotions for legacy

export default { coin }
