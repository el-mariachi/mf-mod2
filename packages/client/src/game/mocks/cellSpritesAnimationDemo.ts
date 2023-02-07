import * as Types from '@game/core/types'
import { MAP_CELL } from '@game/core/constants'
import CellSprite from '@game/core/spriteApi/CellSprite'
import { heroMotions } from '@game/animations/hero'
import { skeletonMotions } from '@game/animations/skeleton'
import skeletonSpriteImg from '@sprites/skeleton.png'
import heroSpriteImg from '@sprites/hero.png'
import { cells2pixels } from '@game/utils'

const STEP_DELAY = 750
function makeStep(animation: Types.SpriteAnimationProcess) {
  return new Promise<Types.SpriteAnimationParams | null>(resolve => {
    setTimeout(
      () => animation.then(result => resolve(result.params)),
      STEP_DELAY
    )
  })
}
export default function spritesAnimationDemo(ctx: CanvasRenderingContext2D) {
  const heroSprite = new Image(MAP_CELL, MAP_CELL)
  heroSprite.src = heroSpriteImg

  const heroView = new CellSprite(
    ctx,
    heroSprite,
    {
      position: [5, 10],
      originPosition: [0, 1],
    },
    heroMotions,
    {
      playMotion: {
        motion: Types.IdleMotionType.idle,
        once: false,
      },
    }
  )

  const skeletonSprite = new Image(MAP_CELL, MAP_CELL)
  skeletonSprite.src = skeletonSpriteImg

  const skeletonView = new CellSprite(
    ctx,
    skeletonSprite,
    {
      position: [9, 10],
      originPosition: [0, 0],
    },
    skeletonMotions,
    {
      playMotion: {
        motion: Types.IdleMotionType.idle,
        once: false,
      },
    }
  )

  makeStep(
    // step 1
    heroView.animate({
      playMotion: {
        motion: Types.MoveMotionType.move,
        once: false,
      },
      // to: {length: 1, direction: Types.AxisDirection.right},
      to: [6, 10],
      duration: 500,
    })
  )
    .then(() =>
      // step 2
      {
        return makeStep(
          heroView.animate({
            playMotion: {
              motion: Types.MoveMotionType.move,
              once: false,
            },
            // to: {length: 1, direction: Types.AxisDirection.right},
            to: [7, 10],
            duration: 500,
          })
        )
      }
    )
    .then(() =>
      // step 3
      {
        return makeStep(
          heroView.animate({
            playMotion: {
              motion: Types.MoveMotionType.move,
              once: false,
            },
            to: {
              length: cells2pixels(1),
              direction: Types.AxisDirection.right,
            },
            // to: [8, 10],
            duration: 500,
          })
        )
      }
    )
    .then(() =>
      // step 4
      {
        heroView.animate({
          playMotion: {
            motion: Types.IdleMotionType.idle,
            once: false,
          },
        })
        return makeStep(
          skeletonView.animate({
            playMotion: {
              motion: Types.AttackMotionType.attack,
              speed: 14,
              once: true,
            },
          })
        )
      }
    )
    .then(() =>
      // step 5
      {
        skeletonView.animate({
          playMotion: {
            motion: Types.IdleMotionType.idle,
            once: false,
          },
        })
        return makeStep(
          heroView.animate({
            playMotion: {
              motion: Types.AttackMotionType.attack,
              once: true,
            },
          })
        )
      }
    )
    .then(() =>
      // step 6
      {
        heroView.animate({
          playMotion: {
            motion: Types.IdleMotionType.idle,
            once: false,
          },
        })
        return skeletonView.animate({
          playMotion: {
            motion: Types.DeathMotionType.death,
            once: true,
          },
        })
      }
    )

  return [heroView, skeletonView]
}
