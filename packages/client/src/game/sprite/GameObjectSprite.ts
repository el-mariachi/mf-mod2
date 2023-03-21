import * as Types from '@type/game'
import CellSprite from '@game/sprite/CellSprite'

export default class GameObjectSprite extends CellSprite {
  constructor(
    ctx: CanvasRenderingContext2D,
    atlas: Types.SpriteAtlas,
    map: Types.LevelMap,
    initGeometry?: Types.CellSpriteGeometry | null,
    motions?: Types.CellSpriteMotions
  ) {
    let initSpriteGeometry: Types.CellSpriteGeometry = {
      position: [0, 0],
      originPosition: [0, 0],
    }
    if (initGeometry) {
      initSpriteGeometry = initGeometry
    } else if (motions && Types.IdleMotionType.idle in motions) {
      // by default get origin from idle motion first frame
      initSpriteGeometry.originPosition =
        motions[Types.IdleMotionType.idle].originPosition
    }
    super(ctx, atlas, map, initSpriteGeometry, motions)
  }
}
