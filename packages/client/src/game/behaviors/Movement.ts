import * as Types from '@type/game'
import { getBehaviorAnimatedProcess } from '@game/behaviors'

export default class Movement implements Types.MoveBehavior {
  constructor(protected _subject: Types.Movable) {}
  with(target: Types.LevelMapCell) {
    let behavior
    if (this._subject?.move) {
      behavior = this._subject.move(target)
    } else {
      const process = getBehaviorAnimatedProcess(
        Types.MoveMotionType.move,
        this._subject,
        target
      )

      const subject = this._subject.cell.extract?.(this._subject)
      target.addObject?.(subject)

      behavior = {
        process,
        result: null,
      }
    }
    this._subject.curBehavior = behavior
    return behavior
  }
}
