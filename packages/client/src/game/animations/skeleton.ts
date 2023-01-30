import { SPRITE_SIZE } from '@game/core/constants'
import * as Types from '@game/core/types'
import { cellCoords2PixelCoords } from '@game/utils'

export const skeletonMotions = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 0],
    origin: {
      position: [0, 0],
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3, 4, 5],
  },
  [Types.DeathMotionType.death]: {
    originPosition: [0, 1],
    origin: { 
      position: cellCoords2PixelCoords([0, 1]),
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
  },
  [Types.AttackMotionType.attack]: {
    originPosition: [0, 2],
    origin: {
      position: cellCoords2PixelCoords([0, 2]),
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3, 4, 5, 6, 5, 3, 2, 1, 0],
  },
  [Types.MoveMotionType.move]: {
    originPosition: [0, 3],
    origin: {
      position: cellCoords2PixelCoords([0, 3]),
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3, 4, 5, 6],
  },
} as Types.SpriteMotions & Types.CellSpriteMotions // Types.SpriteMotions for legacy 
