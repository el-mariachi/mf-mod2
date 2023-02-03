import * as Types from '@game/core/types'

export const skeletonMotions = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 0],
    frames: [0, 1, 2, 3, 4, 5],
  },
  [Types.DeathMotionType.death]: {
    originPosition: [0, 1],
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
  },
  [Types.AttackMotionType.attack]: {
    originPosition: [0, 2],
    frames: [0, 1, 2, 3, 4, 5, 6, 5, 3, 2, 1, 0],
  },
  [Types.MoveMotionType.move]: {
    originPosition: [0, 3],
    frames: [0, 1, 2, 3, 4, 5, 6],
  },
} as Types.CellSpriteMotions
