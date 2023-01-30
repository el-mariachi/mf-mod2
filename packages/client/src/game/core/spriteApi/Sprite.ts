import * as Types from '@game/core/types'
import { DEF_FRAME_PER_SECOND_SPEED, motionTypes } from '@game/core/constants'
import {
  calcMoveCoords,
  calcSpeed,
  isCoordsEqual,
  nextCoordsByVector,
  roundCoords,
} from '@game/utils'
import { muteRes } from '@utils-kit'

type SpriteActiveAnimation = {
  params: Types.SpriteAnimationParams
  process: Types.SpriteAnimationProcess
  motionType: Types.MotionType
  motionFrame: number
  movementSpeed: Types.CoordsSpeed
  isMotionCompleted: boolean
  end: () => void
  cancel: () => void
}

// TODO sprites with frame states (manually change origin?)
export default class Sprite implements Types.AnimatableOnCanvas {
  isVisible = true
  protected _geometry: Types.SpriteGeometry = {
    position: [0, 0],
    size: [0, 0],
    origin: null,
  }
  protected _defaultOrigin: Types.Geometry | null = null // part of sprite atlas to show by default
  protected _activeAnimation: SpriteActiveAnimation | null = null

  constructor(
    protected readonly _ctx: CanvasRenderingContext2D,
    protected readonly _atlas: Types.SpriteAtlas,
    initGeometry: Types.SpriteGeometry,
    protected _motions?: Types.SpriteMotions,
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
      this._geometry.position = roundCoords(nextGeometry.position)
    }
    if (nextGeometry.size) {
      this._geometry.size = nextGeometry.size
    }
    if ('origin' in nextGeometry) {
      this._geometry.origin = nextGeometry.origin || null
    }
  }

  get isAnimated() {
    return !!this._activeAnimation
  }
  animate(params: Types.SpriteAnimationParams | null) {
    this.cancelAnimation();

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

            /* 
            TODO 
            idle = look2bottom
            attack2bottom = attack2left
            attack2top = attack2right
            (the same with everything else)
            */

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
            params.playMotion.motion = this._motions[motion]
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

          const { origin: motionOrigin } = params.playMotion
            .motion as Types.AnimationMotionParams

          this._geometry.origin = motionOrigin // setup first frame for motion
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
              ? nextCoordsByVector(this._geometry.position, params.to)
              : params.to
          ) as Types.Coords

          // console.log({...this._geometry});
          // console.log(params.to);

          movementSpeed = calcSpeed(
            this._geometry.position,
            params.to,
            duration
          )
        }

        const animation: SpriteActiveAnimation = {
          params,
          motionType,
          motionFrame: 0,
          movementSpeed,
          isMotionCompleted: !params.playMotion,
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

        // console.log('this._activeAnimation', this._activeAnimation);

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

      //console.log('stopped', method);

      this._activeAnimation[method]()
      this._activeAnimation = null
    }
  }
  toggle(flag?: boolean) {
    this.isVisible = !!flag
  }

  update(dt: number) {
    if (this._activeAnimation) {
      const { playMotion, to } = this._activeAnimation.params
      const hasMotion = !!playMotion
      const isMotionCompleted =
        !hasMotion || this._activeAnimation.isMotionCompleted
      const isMotionFinite = !!playMotion?.once
      const hasMovement = !!to
      let isMovementCompleted = !hasMovement

      if (hasMotion && !isMotionCompleted) {
        this._activeAnimation.motionFrame += (playMotion.speed as number) * dt
      }

      if (hasMovement) {
        const { movementSpeed } = this._activeAnimation
        const nextPosition = roundCoords(
          calcMoveCoords(this._geometry.position, movementSpeed, dt)
        )

        // @ts-ignore 
        window.nextPosition = nextPosition;

        isMovementCompleted = isCoordsEqual(to as Types.Coords, nextPosition)
        if (!isMovementCompleted) {
          this._geometry.position = nextPosition
        }
      }

      // @ts-ignore
      window.flags = {hasMotion, isMotionFinite, isMotionCompleted, hasMovement, isMovementCompleted};

      if (
        (hasMovement &&
          isMovementCompleted &&
          (!hasMotion || !isMotionFinite || isMotionCompleted)) ||
        (hasMotion && isMotionFinite && isMotionCompleted)
      ) {
        this._stopAnimation()
      }
    }
  }
  render() {
    // @ts-ignore
    window.activeAnimation = this._activeAnimation;

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
        
        if (!('motionPlay' in window))
        {
          // @ts-ignore
          window.motionPlay = {};
        }
        // @ts-ignore
        window.motionPlay[this._atlas.src] = {
          motion,
          motionOrigin,
          motionFrame,
          frames,
          speed,
          once,
        };

        const framesAxisInd = !axis || Types.Axis.horizontal == axis ? 0 : 1

        ;(this._geometry.origin as Types.Geometry).position[framesAxisInd] =
          motionFrame * motionOrigin.size[framesAxisInd]
      }
    }

    // @ts-ignore
    window.geometry = this._geometry;
    
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
