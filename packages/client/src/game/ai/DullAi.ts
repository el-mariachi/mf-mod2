import { AI, LevelMap, Npc } from '@type/game'
import { doNothing } from '@game/behaviors'

export default class DullAi implements AI {
  constructor(protected _npc: Npc, protected _knownMap: LevelMap) {}
  makeDecision() {
    return doNothing
  }
  set knownMap(map: LevelMap) {
    this._knownMap = map
  }
  protected get _position() {
    return this._npc.view.position
  }
}
