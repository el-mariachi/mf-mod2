import * as Types from '@game/core/types'
import { MAP_CELL, SPRITE_SIZE } from '@game/core/constants'
import Sprite from '@game/core/spriteApi/Sprite'
import { heroMotions } from '@game/animations/hero'
import { skeletonMotions } from '@game/animations/skeleton'
import { cellCoords2PixelCoords, mapCoords, relCoords } from '@game/utils'
import skeletonSpriteImg from '@sprites/skeleton.png'
import heroSpriteImg from '@sprites/hero.png'

// DEPRICATED: with cur units motions it wouldnt work!

const STEP_DELAY = 850

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

  const heroView = new Sprite(
    ctx,
    heroSprite,
    {
      position: relCoords(mapCoords(), cellCoords2PixelCoords([5, 10])),
      size: SPRITE_SIZE,
      origin: {
        position: cellCoords2PixelCoords([0, 1]),
        size: SPRITE_SIZE,
      },
    },
    // @ts-ignore
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

  const skeletonView = new Sprite(
    ctx,
    skeletonSprite,
    {
      position: relCoords(mapCoords(), cellCoords2PixelCoords([9, 10])),
      size: SPRITE_SIZE,
      origin: {
        position: [0, 0],
        size: SPRITE_SIZE,
      },
    },
    // @ts-ignore
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
      to: { length: 1, direction: Types.AxisDirection.right },
      // to: relCoords(mapCoords(), cellCoords2PixelCoords([6, 10])),
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
            // to: relCoords(mapCoords(), cellCoords2PixelCoords([7, 10])),
            to: relCoords(mapCoords(), cellCoords2PixelCoords([7, 10])),
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
            to: relCoords(mapCoords(), cellCoords2PixelCoords([8, 10])),
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
