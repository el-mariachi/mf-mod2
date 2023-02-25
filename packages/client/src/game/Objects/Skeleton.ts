import * as Types from '@type/game'
import PatrolMonsterAi from '@game/ai/PatrolMonsterAi'
import { skeletonMotions } from '@game/animations/skeleton'
import _Warrior from './Warrior'
import skeletonSrc from '@sprites/skeleton.png'

export default class Skeleton extends _Warrior implements Types.Npc {
  brain: PatrolMonsterAi
  name = Types.GameUnitName.skeleton
  spriteSrc = skeletonSrc
  motions = skeletonMotions
  protected _strength = 50
  protected _criticalAttackChance = 0.25
  protected _criticalAttackLevel = 0.05
  protected _stamina = 20
  protected _successDefenceChance = 0.05
  protected _successDefenceLevel = 0.01
  protected _healthResourse = {
    value: 75,
    max: 75,
  } as Types.UnitResource
  constructor() {
    super()
    this.brain = new PatrolMonsterAi(this)
  }
}
