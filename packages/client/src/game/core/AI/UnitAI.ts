import { LevelMap, UnitBehaviorDef } from '@game/core/types'
import GameObject from '@game/Objects/GameObject'
import Skeleton from '@game/Objects/Skeleton'

export default abstract class UnitAI {
  constructor(
    protected _levelMap: LevelMap,
    // TODO need to refactor game objects hierarchy and use Monster or Unit type here
    protected _monster: Skeleton
  ) {}
  abstract makeDecision(): UnitBehaviorDef
}
