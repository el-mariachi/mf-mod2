import {
  DEF_MOVE_DURATION,
  emptyAnimationProcess,
  STEP_TIME,
} from '@constants/game'
import * as Types from '@type/game'
import { defineAxisDir, rowcol2coords } from '@utils/game'
import { capitalize } from '@utils/index'

export function getViewBehaviorAnimationParams(
  behavior: Types.ViewBehaviorDef
) {
  const { type, dir: dirOrRot } = behavior
  let animatedBehavior: Types.BehaviorAnimationParams

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
export function getBehaviorAnimatedProcess(
  behavior: Types.BehaviorDef,
  subject: Types.GameObjectDef,
  targetCell: Types.LevelMapCell
) {
  const dir = defineAxisDir(
    rowcol2coords(subject.cell.position),
    rowcol2coords(targetCell.position)
  )
  const viewBehavior = dir
    ? ({
        type: behavior,
        dir,
      } as Types.ViewBehaviorDef)
    : null

  return viewBehavior && subject.view.do
    ? (subject.view.do(viewBehavior) as Types.BehaviorAnimatedProcess)
    : emptyAnimationProcess
}

export const doNothing = {
  type: Types.UnspecifiedMotionType.none,
} as Types.ViewBehaviorDef
export const idle = {
  type: Types.IdleMotionType.idle,
} as Types.ViewBehaviorDef
export const look2top = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.top,
} as Types.ViewBehaviorDef
export const look2right = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.right,
} as Types.ViewBehaviorDef
export const look2bottom = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.bottom,
} as Types.ViewBehaviorDef
export const look2left = {
  type: Types.IdleMotionType.idle,
  dir: Types.AxisDirection.left,
} as Types.ViewBehaviorDef
export const move2top = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.top,
} as Types.ViewBehaviorDef
export const move2right = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.right,
} as Types.ViewBehaviorDef
export const move2bottom = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.bottom,
} as Types.ViewBehaviorDef
export const move2left = {
  type: Types.MoveMotionType.move,
  dir: Types.AxisDirection.left,
} as Types.ViewBehaviorDef
export const attack2top = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.top,
} as Types.ViewBehaviorDef
export const attack2right = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.right,
} as Types.ViewBehaviorDef
export const attack2bottom = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.bottom,
} as Types.ViewBehaviorDef
export const attack2left = {
  type: Types.AttackMotionType.attack,
  dir: Types.AxisDirection.left,
} as Types.ViewBehaviorDef
export const damageFromTop = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.top,
} as Types.ViewBehaviorDef
export const damageFromRight = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.right,
} as Types.ViewBehaviorDef
export const damageFromBottom = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.bottom,
} as Types.ViewBehaviorDef
export const damageFromLeft = {
  type: Types.DamageMotionType.damage,
  dir: Types.AxisDirection.left,
} as Types.ViewBehaviorDef
export const destructionFromTop = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.top,
} as Types.ViewBehaviorDef
export const destructionFromRight = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.right,
} as Types.ViewBehaviorDef
export const destructionFromBottom = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.bottom,
} as Types.ViewBehaviorDef
export const destructionFromLeft = {
  type: Types.DestructionMotionType.destruction,
  dir: Types.AxisDirection.left,
} as Types.ViewBehaviorDef

export default {
  doNothing,
  idle,
  look2top,
  look2right,
  look2bottom,
  look2left,
  move2top,
  move2right,
  move2bottom,
  move2left,
  attack2top,
  attack2right,
  attack2bottom,
  attack2left,
  damageFromTop,
  damageFromRight,
  damageFromBottom,
  damageFromLeft,
  destructionFromTop,
  destructionFromRight,
  destructionFromBottom,
  destructionFromLeft,
}
