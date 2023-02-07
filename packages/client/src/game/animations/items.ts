import * as Types from '@game/core/types'

const coin = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 0],
    frames: [0, 1, 2, 3],
  },
} as Types.CellSpriteMotions

const chest = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 2],
    origin: {
      position: [0, 0],
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3],
  },
} as Types.SpriteMotions & Types.CellSpriteMotions

const bottle = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 3],
    origin: {
      position: [0, 0],
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3],
  },
} as Types.SpriteMotions & Types.CellSpriteMotions

const key = {
  [Types.IdleMotionType.idle]: {
    originPosition: [0, 1],
    origin: {
      position: [0, 0],
      size: SPRITE_SIZE,
    },
    frames: [0, 1, 2, 3],
  },
} as Types.SpriteMotions & Types.CellSpriteMotions

export default { coin, chest, key, bottle }
