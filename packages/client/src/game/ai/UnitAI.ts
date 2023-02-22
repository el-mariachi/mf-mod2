import { LevelMap, UnitBehaviorDef } from '@type/game'
import GameObject from '@game/objects/GameObject'
import Skeleton from '@game/objects/Skeleton'

export default abstract class UnitAI {
  constructor(
    protected _levelMap: LevelMap,
    // TODO need to refactor game objects hierarchy and use Monster or Unit type here
    protected _monster: Skeleton
  ) { }
  abstract makeDecision(): UnitBehaviorDef
}
