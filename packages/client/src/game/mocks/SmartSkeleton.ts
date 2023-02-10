import UnitAI from '@game/core/AI/UnitAI'
import * as Types from '@game/core/types'
import Skeleton from '@game/Objects/Skeleton'

export default class SmartSkeleton {
  constructor(
    protected _subject: Skeleton,
    public brain: UnitAI,
    public cell: Types.LevelMapCell
  ) { }
  doStep() {
    const behavior = this.brain.makeDecision()
    let animation: Types.CellSpriteAnimationProcess
    // TODO below is temporary hack. 
    // We need set GameUnitName for UnitView, then use it in getAnimatedBehavior 
    // for customize animations depending of unit type
    const { type: behaviorType } = behavior
    if (Types.MoveMotionType.move == behaviorType) {
      animation = this.view.do(behavior, true, 22)
    }
    else if (Types.AttackMotionType.attack == behaviorType) {
      animation = this.view.do(behavior, true, 14)
    }
    else {
      animation = this.view.do(behavior)
    }
    // the end of hack
    const interaction: Types.GameInteractionDef = {
      behavior,
      animation,
      subject: this._subject,
    }
    // ... fire interaction ctrl here or in life ctrl ?
    return interaction
  }
  get view() {
    return this.subject.view
  }
  get subject() {
    return this._subject
  }
}
