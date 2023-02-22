import * as Types from '@types/game'
import CellSprite from '@game/sprite/CellSprite'

export default class GameObjectSprite extends CellSprite {
  constructor(
    ctx: CanvasRenderingContext2D,
    atlas: Types.SpriteAtlas,
    motions?: Types.CellSpriteMotions
  ) {
    let originPosition: Types.Coords = [0, 0]
    // by default get origin from idle motion first frame
    if (motions && Types.IdleMotionType.idle in motions) {
      originPosition = motions[Types.IdleMotionType.idle].originPosition
    }
    super(
      ctx,
      atlas,
      {
        position: [0, 0], // position would be given by view
        originPosition,
      },
      motions
    )
  }
}
