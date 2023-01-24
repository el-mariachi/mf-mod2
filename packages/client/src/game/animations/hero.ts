import { SPRITE_SIZE } from '@game/core/constants'
import * as Types from '@game/core/types'
import { cellCoords2PixelCoords } from '@game/utils'

export const heroMotions = {  
  [Types.MoveMotionType.move]: {
    originPosition: [0, 1],
    origin: {
      position: cellCoords2PixelCoords([0, 1]),
      size: SPRITE_SIZE
    },
    frames: [0,1,2,3]
  },
  [Types.AttackMotionType.attack]: {
    originPosition: [0, 5],
    origin: {
      position: cellCoords2PixelCoords([0, 5]),
      size: SPRITE_SIZE
    },
    frames: [0,1,2,3],
  },
} as Types.SpriteMotions & Types.CellSpriteMotions
