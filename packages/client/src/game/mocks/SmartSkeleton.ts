import UnitAI from "@game/core/AI/UnitAI";
import { GameInteractionDef, LevelMapCell } from "@game/core/types";
import Skeleton from "@game/Objects/Skeleton";

export default class SmartSkeleton {
  constructor(
    protected _subject:Skeleton, 
    public brain:UnitAI,
    public cell:LevelMapCell
  ) {}
  doStep(){
    const behavior = this.brain.makeDecision()
    // this._skeleton.view.do(behavior)

    const interaction:GameInteractionDef = {
      behavior,
      animation: this.view.do(behavior),
      // position: Coords,
      subject: this._subject
    }
    // console.log('do step!', behavior);
    return interaction
  }  
  get view ()
  {
    return this.subject.view
  }
  get subject ()
  {
    return this._subject
  }
}
