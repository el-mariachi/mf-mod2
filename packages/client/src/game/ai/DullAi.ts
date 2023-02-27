import { Ai, BehaviorDecision, LevelMap, Npc } from '@type/game'
import { doNothing } from '@game/behaviors'

export default class DullAi implements Ai {
  constructor(protected _npc: Npc, protected _knownMap: LevelMap) {}
  makeDecision() {
    return {
      subject: this._npc,
      behavior: doNothing.type,
    } as BehaviorDecision
  }
  set knownMap(map: LevelMap) {
    this._knownMap = map
  }
  protected get _position() {
    return this._npc.view.position
  }
}
