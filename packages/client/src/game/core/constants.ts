import * as Types from '@game/core/types'

export const MAP_CELL = 32
export const SPRITE_SIZE: Types.Size = [MAP_CELL, MAP_CELL]
export const BG_COLOR = '#260a13'
export const FONT_COLOR = '#9d5e6e'
export const STEP_TIME = 1000
export const DEF_FRAME_PER_SECOND_SPEED = 7
export const DEF_MOVE_DURATION = 500
export const HERO_MOVE_DELAY = 10

// TODO need refactoring for motions/behaviors types
export const motionTypes: Types.MotionTypes = {
  ...Types.IdleMotionType,
  ...Types.MoveMotionType,
  ...Types.AttackMotionType,
  ...Types.DeathMotionType,
  ...Types.DamageMotionType,
  ...Types.TurnMotionType,
  ...Types.UnspecifiedMotionType,
}
