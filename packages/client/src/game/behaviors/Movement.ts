import * as Types from '@type/game'
import { getBehaviorAnimatedProcess } from '@game/behaviors'

export default class Movement implements Types.MoveBehavior {
  constructor(protected _subject: Types.Movable) {}
  with(targetCell: Types.LevelMapCell) {
    let behavior
    if (this._subject?.move) {
      behavior = this._subject.move(targetCell)
    } else {
      const process = getBehaviorAnimatedProcess(
        Types.MoveMotionType.move,
        this._subject,
        targetCell
      )

      const gameObject = this._subject.cell.extract(this._subject)
      targetCell.addObject?.(gameObject)

      behavior = {
        process,
        result: null,
      }
    }
    return (this._subject.lastBehavior = behavior)
  }
}
