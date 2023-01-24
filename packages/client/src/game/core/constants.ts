import * as Types from '@game/core/types'

export const MAP_CELL = 32;
export const SPRITE_SIZE: Types.Size = [MAP_CELL, MAP_CELL];
export const BG_COLOR = '#260a13';
export const STEP_TIME = 800;
export const DEF_FRAME_PER_SECOND_SPEED = 7;

export const motionTypes : Types.MotionTypes = {...Types.IdleMotionType, ...Types.MoveMotionType, ...Types.AttackMotionType, ...Types.DeathMotionType, ...Types.DamageMotionType, ...Types.TurnMotionType, ...Types.UnspecifiedMotionType}


// export type MapCell = Types.Cell<typeof MAP_CELL>
