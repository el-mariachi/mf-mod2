import * as Types from '@type/game'
import GameObjectSprite from '@game/sprite/GameObjectSprite'

export default class GameObjectView
  implements Types.DrawableOnCanvas, Types.GameObjectViewDef
{
  constructor(protected _sprite: GameObjectSprite, position?: Types.Coords) {
    if (position) {
      this.position = position
      this.render()
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
}
