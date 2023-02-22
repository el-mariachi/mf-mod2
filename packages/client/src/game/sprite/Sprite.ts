import * as Types from '@types/game'
import { DEF_FRAME_PER_SECOND_SPEED, motionTypes } from '@constants/game'
import * as Utils from '@utils/game'
import { muteRes } from '@utils/index'

type SpriteActiveAnimation = {
  params: Types.SpriteAnimationParams
  process: Types.SpriteAnimationProcess
  motionType: Types.MotionType
  motionFrame: number
  isMotionCompleted: boolean
  movementSpeed: Types.CoordsSpeed
  elapsed: number
  end: () => void
  cancel: () => void
}

export default class Sprite implements Types.AnimatableOnCanvas {
  isVisible = true
  protected _geometry: Types.SpriteGeometry = {
    position: [0, 0],
    size: [0, 0],
    origin: null,
  }
  protected _defaultOrigin: Types.Geometry | null = null // part of sprite atlas to show by default
  protected _motions: Types.SpriteMotions | null = null
  protected _activeAnimation: SpriteActiveAnimation | null = null

  constructor(
    protected readonly _ctx: CanvasRenderingContext2D,
    protected readonly _atlas: Types.SpriteAtlas,
    initGeometry: Types.SpriteGeometry,
    motions?: Types.SpriteMotions,
    initAnimation?: Types.SpriteAnimationParams
  ) {
    if (!initGeometry.position) {
      initGeometry.position = [0, 0]
    }
    if (!initGeometry.size) {
      initGeometry.size = [this._atlas.width, this._atlas.height]
    }
    if (!initGeometry.origin) {
      initGeometry.origin = null
    }
    this.geometry = initGeometry
    this._defaultOrigin = initGeometry.origin

    if (motions) {
      this._motions = this._processMotions(motions)
    }
    if (initAnimation) {
      this.animate(initAnimation)
    }
  }
  get canvas() {
    return this._ctx
  }
  get position() {
    return [...this._geometry.position] as Types.Coords
  }
  get size() {
    return [...this._geometry.size] as Types.Size
  }
  get defaultOrigin() {
    return this._defaultOrigin
  }
  set defaultOrigin(nextDefOrigin: Types.Geometry | null) {
    this._defaultOrigin = nextDefOrigin
  }
  protected resetOrigin() {
    this._geometry.origin = this._defaultOrigin
  }
  set geometry(nextGeometry: Partial<Types.SpriteGeometry>) {
    if (nextGeometry.position) {
      this._geometry.position = Utils.roundCoords(nextGeometry.position)
    }
    if (nextGeometry.size) {
      this._geometry.size = nextGeometry.size
    }
    if ('origin' in nextGeometry) {
      this._geometry.origin = nextGeometry.origin || null
    }
  }

  protected _processMotions(motions: Types.SpriteMotions) {
    // let`s define substituitions for motions if we dnt have a full animation set
    ;['look', 'move', 'attack', 'damage', 'death'].forEach(type => {
      ;['right', 'left', 'top', 'bottom'].forEach(dir => {
        const dirCap = dir[0].toUpperCase() + dir.slice(1)
        const isStandingMotion = ['damage', 'death'].includes(type)
        const isVerticalDir = ['top', 'bottom'].includes(dir)
        const needMotion = (
          isStandingMotion ? `${type}From${dirCap}` : `${type}2${dir}`
        ) as Types.MotionType

        let substituteMotion!: Types.MotionType
        if (!(needMotion in motions)) {
          if (isVerticalDir) {
            if (isStandingMotion) {
              substituteMotion = (
                'top' == dir ? `${type}FromRight` : `${type}FromLeft`
              ) as Types.MotionType
            } else {
              substituteMotion = (
                'top' == dir ? `${type}2right` : `${type}2left`
              ) as Types.MotionType
            }
          }

          if (!substituteMotion || !(substituteMotion in motions)) {
            substituteMotion = `look2${dir}` as Types.MotionType
          }

          if (substituteMotion in motions) {
            motions[needMotion] = motions[
              substituteMotion
            ] as Types.AnimationMotionParams
          }
        }
      })
    })
    // by default units look to bottom (where map`s begun) when idle
    // TODO motion func need to be defined in views as behavior?
    if (
      !(Types.IdleMotionType.idle in motions) &&
      Types.IdleMotionType.look2bottom in motions
    ) {
      motions[Types.IdleMotionType.idle] =
        motions[Types.IdleMotionType.look2bottom]
    }
    return motions
  }
  get isAnimated() {
    return !!this._activeAnimation
  }
  animate(params: Types.SpriteAnimationParams | null) {
    this.cancelAnimation()

    const result = {
      params,
      reason: 'end',
    } as Types.SpriteAnimationProcessResult
    if (params) {
      let motionType: Types.MotionType = Types.UnspecifiedMotionType.none
      if (params.playMotion) {
        let { motion } = params.playMotion

        // if we have motions set for sprite and motion is of type MotionType
        if (
          this._motions &&
          typeof motion == 'string' &&
          motion in motionTypes
        ) {
          // const this._motions = Object.keys(this._motions);
          // ... but we dnt have this motion in set
          if (!(motion in this._motions)) {
            // ... so we`ll use default motion for each motion type (if we have it in set)
            // TODO need refactoring
            if (
              motion in Types.IdleMotionType &&
              Types.IdleMotionType.idle in this._motions
            ) {
              motion = Types.IdleMotionType.idle
            } else if (
              motion in Types.MoveMotionType &&
              Types.MoveMotionType.move in this._motions
            ) {
              motion = Types.MoveMotionType.move
            } else if (
              motion in Types.AttackMotionType &&
              Types.AttackMotionType.attack in this._motions
            ) {
              motion = Types.AttackMotionType.attack
            } else if (
              motion in Types.DeathMotionType &&
              Types.DeathMotionType.death in this._motions
            ) {
              motion = Types.DeathMotionType.death
            } else if (
              motion in Types.DamageMotionType &&
              Types.DamageMotionType.damage in this._motions
            ) {
              motion = Types.DamageMotionType.damage
            } else if (
              motion in Types.TurnMotionType &&
              Types.TurnMotionType.turn in this._motions
            ) {
              motion = Types.TurnMotionType.turn
            } else motion = Types.UnspecifiedMotionType.none
          }

          // ... and finally get AnimationMotionParams object from set, instead of MotionType string
          if (Types.UnspecifiedMotionType.none != motion) {
            params.playMotion.motion = this._motions[
              motion
            ] as Types.AnimationMotionParams
            motionType = motion
          }
        }
        // if motion is of type AnimationMotionParams
        else if (typeof motion == 'object' && 'frames' in motion) {
          motionType = Types.UnspecifiedMotionType.custom
        }

        if (Types.UnspecifiedMotionType.none == motionType) {
          this.resetOrigin()
          delete params.playMotion
        }
      }

      if (params.playMotion || (params.to && params.duration)) {
        if (params.playMotion) {
          if (!params.playMotion.speed) {
            params.playMotion.speed = DEF_FRAME_PER_SECOND_SPEED
          }

          const motion = params.playMotion.motion as Types.AnimationMotionParams
          if (!motion.frames || !motion.frames.length) {
            motion.frames = [0]
          }

          const { origin: motionOrigin } = motion
          this._geometry.origin = motionOrigin // setup first frame for motion

          params.playMotion.motion = motion
        }

        let movementSpeed: Types.CoordsSpeed = [0, 0]
        let { duration } = params
        if (!duration) {
          duration = 0
        }
        duration /= 1000

        if (params.to) {
          params.to = (
            !Array.isArray(params.to)
              ? Utils.nextCoordsByVector(this._geometry.position, params.to)
              : params.to
          ) as Types.Coords

          movementSpeed = Utils.calcSpeed(
            this._geometry.position,
            params.to,
            duration
          )
        }

        const animation: SpriteActiveAnimation = {
          params,
          motionType,
          motionFrame: 0,
          isMotionCompleted: !params.playMotion,
          movementSpeed,
          elapsed: 0,
          end: muteRes,
          cancel: muteRes,
          process: Promise.resolve(result),
        }
        animation.process = new Promise<Types.SpriteAnimationProcessResult>(
          resolve => {
            animation.end = () => resolve(result)
            animation.cancel = () => resolve({ params, reason: 'cancel' })
          }
        )
        this._activeAnimation = animation

        return animation.process
      }
    }
    return Promise.resolve(result)
  }
  cancelAnimation() {
    this._stopAnimation('cancel')
  }
  protected _stopAnimation(method: 'end' | 'cancel' = 'end') {
    if (this._activeAnimation) {
      this._activeAnimation[method]()
      this._activeAnimation = null
    }
  }
  toggle(flag?: boolean) {
    this.isVisible = !!flag
  }

  update(dt: number) {
    if (this._activeAnimation) {
      const to = this._activeAnimation.params.to as Types.Coords
      const { playMotion, duration } = this._activeAnimation.params
      const hasMotion = !!playMotion
      const isMotionFinite = !!playMotion?.once
      const hasMovement = !!to

      this._activeAnimation.elapsed += dt * 1000
      if (
        !hasMovement &&
        !isMotionFinite &&
        duration &&
        this._activeAnimation.elapsed >= duration
      ) {
        this._activeAnimation.isMotionCompleted = true
      }

      const isMotionCompleted =
        !hasMotion || this._activeAnimation.isMotionCompleted
      if (hasMotion && !isMotionCompleted) {
        this._activeAnimation.motionFrame += (playMotion.speed as number) * dt
      }

      let isMovementCompleted = !hasMovement
      if (hasMovement) {
        const { movementSpeed } = this._activeAnimation
        const nextPosition = Utils.roundCoords(
          Utils.calcMoveCoords(this._geometry.position, movementSpeed, dt)
        )

        isMovementCompleted = Utils.isDestinationReached(
          this._geometry.position,
          nextPosition,
          to
        )
        this._geometry.position = !isMovementCompleted ? nextPosition : to
      }

      if (
        (hasMovement &&
          isMovementCompleted &&
          (!hasMotion || !isMotionFinite || isMotionCompleted)) ||
        (hasMotion && isMotionCompleted)
      ) {
        this._stopAnimation()
      }
    }
  }
  render() {
    if (!this.isVisible) return

    if (this._activeAnimation) {
      let { motionFrame } = this._activeAnimation
      const { isMotionCompleted } = this._activeAnimation
      const { playMotion } = this._activeAnimation.params

      if (playMotion && !isMotionCompleted) {
        const motion = playMotion.motion as Types.AnimationMotionParams
        const { frames, origin: motionOrigin, axis } = motion
        const speed = playMotion.speed as number
        const once = !!playMotion.once

        if (speed > 0) {
          const framesCnt = frames.length
          const frameInd = Math.floor(motionFrame)

          if (once && frameInd >= framesCnt) {
            this._activeAnimation.isMotionCompleted = true

            if (motionFrame > framesCnt - 1) {
              motionFrame = framesCnt - 2
            }
          } else motionFrame = frames[frameInd % framesCnt]
        } else motionFrame = 0

        const framesAxisInd = !axis || Types.Axis.horizontal == axis ? 0 : 1

        ;(this._geometry.origin as Types.Geometry).position[framesAxisInd] =
          motionFrame * motionOrigin.size[framesAxisInd]
      }
    }

    const { origin } = this._geometry
    if (origin) {
      this._ctx.drawImage(
        this._atlas,
        origin.position[0],
        origin.position[1],
        origin.size[0],
        origin.size[1],
        this.position[0],
        this.position[1],
        this.size[0],
        this.size[1]
      )
    } else
      this._ctx.drawImage(
        this._atlas,
        this.position[0],
        this.position[1],
        this.size[0],
        this.size[1]
      )
  }
}
