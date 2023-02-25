import { DEF_MOVE_DURATION, STEP_TIME } from '@constants/game'
import * as Types from '@type/game'
import { capitalize } from '@utils/index'

export const doNothing = {
  type: Types.UnspecifiedMotionType.none,
} as Types.UnitBehaviorDef
export const idle = {
  type: Types.IdleMotionType.idle,
} as Types.UnitBehaviorDef
export const look2top = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.top,
} as Types.UnitBehaviorDef
export const look2right = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.right,
} as Types.UnitBehaviorDef
export const look2bottom = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.bottom,
} as Types.UnitBehaviorDef
export const look2left = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.left,
} as Types.UnitBehaviorDef
export const move2top = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.top,
} as Types.UnitBehaviorDef
export const move2right = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.right,
} as Types.UnitBehaviorDef
export const move2bottom = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.bottom,
} as Types.UnitBehaviorDef
export const move2left = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.left,
} as Types.UnitBehaviorDef
export const attack2top = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.top,
} as Types.UnitBehaviorDef
export const attack2right = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.right,
} as Types.UnitBehaviorDef
export const attack2bottom = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.bottom,
} as Types.UnitBehaviorDef
export const attack2left = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.left,
} as Types.UnitBehaviorDef
export const damageFromTop = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.top,
} as Types.UnitBehaviorDef
export const damageFromRight = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.right,
} as Types.UnitBehaviorDef
export const damageFromBottom = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.bottom,
} as Types.UnitBehaviorDef
export const damageFromLeft = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.left,
} as Types.UnitBehaviorDef
export const destructionFromTop = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.top,
} as Types.UnitBehaviorDef
export const destructionFromRight = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.right,
} as Types.UnitBehaviorDef
export const destructionFromBottom = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.bottom,
} as Types.UnitBehaviorDef
export const destructionFromLeft = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.left,
} as Types.UnitBehaviorDef

export default function getAnimatedBehavior(behavior: Types.UnitBehaviorDef) {
  const { type, dir: dirOrRot } = behavior
  let animatedBehavior: Types.CellSpriteAnimationParams

  if (dirOrRot) {
    const isRotation = dirOrRot in Types.Rotation
    if (!isRotation) {
      const direction = dirOrRot as Types.AxisDirection
      const dirCap = capitalize(direction)

      if (Types.IdleMotionType.idle == type) {
        animatedBehavior = {
          playMotion: {
            motion:
              Types.IdleMotionType[`look2${direction}` as Types.IdleMotionType],
            once: false,
          },
          duration: STEP_TIME,
        }
      } else if (Types.MoveMotionType.move == type) {
        animatedBehavior = {
          playMotion: {
            motion: Types.MoveMotionType[`move2${direction}`],
            once: false,
          },
          to: { length: 1, direction: Types.AxisDirection[direction] },
          duration: DEF_MOVE_DURATION,
        }
      } else if (Types.AttackMotionType.attack == type) {
        animatedBehavior = {
          playMotion: {
            motion: Types.AttackMotionType[`attack2${direction}`],
            once: true,
          },
        }
      } else if (Types.DamageMotionType.damage == type) {
        animatedBehavior = {
          playMotion: {
            motion:
              Types.DamageMotionType[
                `${type}From${dirCap}` as Types.DamageMotionType
              ],
            once: true,
          },
        }
      } else if (Types.DestructionMotionType.destruction == type) {
        animatedBehavior = {
          playMotion: {
            motion:
              Types.DestructionMotionType[
                `${type}From${dirCap}` as Types.DestructionMotionType
              ],
            once: true,
          },
        }
      } else
        animatedBehavior = {
          playMotion: {
            motion: Types.IdleMotionType.idle,
            once: false,
          },
          duration: STEP_TIME,
        }
    } else {
      const direction = dirOrRot as Types.Rotation

      if (Types.TurnMotionType.turn == type) {
        animatedBehavior = {
          playMotion: {
            motion:
              Types.TurnMotionType[
                `turn${capitalize(direction)}` as Types.TurnMotionType
              ],
            once: true,
          },
        }
      } else
        animatedBehavior = {
          playMotion: {
            motion: Types.UnspecifiedMotionType.none,
          },
        }
    }
  } else if (Types.UnspecifiedMotionType.none == type) {
    animatedBehavior = {
      playMotion: {
        motion: Types.UnspecifiedMotionType.none,
      },
    }
  } else
    animatedBehavior = {
      playMotion: {
        motion: type,
      },
    }
  return animatedBehavior
}
