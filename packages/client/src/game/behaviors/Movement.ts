import * as Types from '@type/game'
import * as Behaviors from '@game/behaviors'
import { emptyAnimationProcess } from '@constants/game'
import { defineDirection } from '@utils/game'

export default class Movement implements Types.MoveBehavior {
  constructor(protected _subject: Types.Movable) {}
  with(target: Types.LevelMapCell) {
    if (this._subject?.move) {
      return this._subject.move(target)
    } else {
      // TODO
      const dir: Types.AxisDirection = defineDirection(
        this._subject.cell.position,
        target.position
      )

      // const subject =
      this._subject.cell.extract?.(this._subject)
      target.addObject?.(this._subject)

      // TODO otherwise re-render ?

      return {
        process:
          this._subject.view.do?.(Behaviors[`move2${dir}`]) ??
          emptyAnimationProcess,
        result: null,
      }
    }
  }
}
