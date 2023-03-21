import * as Types from '@type/game'
import GameObjectSprite from '@game/sprite/GameObjectSprite'
import { cellCoords2PixelCoords, isCoordsEqual } from '@utils/game'

export default class GameObjectView
  implements Types.DrawableOnCanvas, Types.GameObjectViewDef
{
  protected _positionCache: Types.Coords = [0, 0]
  constructor(protected _sprite: GameObjectSprite, position?: Types.Coords) {
    if (position) {
      this.position = position
    }
  }
  get sprite() {
    return this._sprite
  }
  get canvas() {
    return this.sprite.canvas
  }
  get position() {
    return this.sprite.cellPostion
  }
  set position(position: Types.Coords) {
    this.sprite.cellGeometry = { position }
    this._positionCache = position
    this.render()
  }
  get size() {
    return this.sprite.size
  }
  render(): void {
    this.sprite.render()
  }
  toggle(flag?: boolean) {
    this.sprite.toggle(flag)
  }
  actualizeOnCanvas(map: Types.LevelMap) {
    const curPosition = this.sprite.position
    const position = map.onCanvasCoords(
      cellCoords2PixelCoords(this._positionCache)
    )
    if (!isCoordsEqual(curPosition, position)) {
      this.sprite.geometry = { position }
      this.render()
    }
  }
}
