import * as Types from '@types/game'

export const heroMotions = {
  [Types.IdleMotionType.look2top]: {
    originPosition: [0, 0],
  },
  [Types.IdleMotionType.look2right]: {
    originPosition: [0, 1],
  },
  [Types.IdleMotionType.look2bottom]: {
    originPosition: [0, 3],
  },
  [Types.IdleMotionType.look2left]: {
    originPosition: [0, 2],
  },
  [Types.MoveMotionType.move2right]: {
    originPosition: [0, 1],
    frames: [0, 1, 2, 3],
  },
  [Types.MoveMotionType.move2bottom]: {
    originPosition: [0, 7],
    frames: [0, 1, 2, 3],
  },
  [Types.MoveMotionType.move2left]: {
    originPosition: [0, 2],
    frames: [0, 1, 2, 3],
  },
  [Types.MoveMotionType.move2top]: {
    originPosition: [0, 4],
    frames: [0, 1, 2, 3],
  },
  [Types.AttackMotionType.attack2top]: {
    originPosition: [0, 8],
    frames: [0, 1, 2, 3],
  },
  [Types.AttackMotionType.attack2right]: {
    originPosition: [0, 5],
    frames: [0, 1, 2, 3],
  },
  [Types.AttackMotionType.attack2bottom]: {
    originPosition: [0, 9],
    frames: [0, 1, 2, 3],
  },
  [Types.AttackMotionType.attack2left]: {
    originPosition: [0, 6],
    frames: [0, 1, 2, 3],
  },
  [Types.DeathMotionType.death]: {
    originPosition: [0, 3],
    frames: [0, 1, 2, 3],
  },
} as Types.CellSpriteMotions
