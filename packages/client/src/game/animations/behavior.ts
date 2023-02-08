import { DEF_MOVE_DURATION } from '@game/core/constants'
import * as Types from '@game/core/types'

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
export const deathFromTop = {
  type: Types.DeathMotionType.death,
  dir: Types.AxisDirection.top,
} as Types.UnitBehaviorDef
export const deathFromRight = {
  type: Types.DeathMotionType.death,
  dir: Types.AxisDirection.right,
} as Types.UnitBehaviorDef
export const deathFromBottom = {
  type: Types.DeathMotionType.death,
  dir: Types.AxisDirection.bottom,
} as Types.UnitBehaviorDef
export const deathFromLeft = {
  type: Types.DeathMotionType.death,
  dir: Types.AxisDirection.left,
} as Types.UnitBehaviorDef

export default function getAnimatedBehavior(behavior: Types.UnitBehaviorDef) {
  const { type, dir: dirOrRot } = behavior
  let animatedBehavior: Types.CellSpriteAnimationParams

  if (dirOrRot) {
    const isRotation = dirOrRot in Types.Rotation
    if (!isRotation) {
      const direction = dirOrRot as Types.AxisDirection
      const dirCap = direction[0].toUpperCase() + direction.slice(1)

      if (Types.IdleMotionType.idle == type) {
        animatedBehavior = {
          playMotion: {
            motion:
              Types.IdleMotionType[`look2${direction}` as Types.IdleMotionType],
            once: false,
          },
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
      } else if (Types.DeathMotionType.death == type) {
        animatedBehavior = {
          playMotion: {
            motion:
              Types.DeathMotionType[
                `${type}From${dirCap}` as Types.DeathMotionType
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
        }
    } else {
      const direction = dirOrRot as Types.Rotation
      const dirCap = direction[0].toUpperCase() + direction.slice(1)

      if (Types.TurnMotionType.turn == type) {
        animatedBehavior = {
          playMotion: {
            motion:
              Types.TurnMotionType[`turn${dirCap}` as Types.TurnMotionType],
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
