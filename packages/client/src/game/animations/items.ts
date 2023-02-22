import * as Types from '@types/game'

const coin = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 0],
    frames: [0, 1, 2, 3],
  },
} as Types.CellSpriteMotions

const chest = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 2],
    frames: [0, 1, 2, 3],
  },
} as Types.CellSpriteMotions

const bottle = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 3],
    frames: [0, 1, 2, 3],
  },
} as Types.CellSpriteMotions

const key = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 1],
    frames: [0, 1, 2, 3],
  },
} as Types.CellSpriteMotions

export default { coin, chest, key, bottle }
