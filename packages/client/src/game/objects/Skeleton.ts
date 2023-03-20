import * as Types from '@type/game'
import PatrolMonsterAi from '@game/ai/PatrolMonsterAI'
import { skeletonMotions } from '@game/animations/skeleton'
import _Warrior from './Warrior'
import resources from '@game/mocks/resources'
import { initResource } from '@utils/game'

export default class Skeleton extends _Warrior implements Types.Npc {
  brain: PatrolMonsterAi
  name = Types.GameUnitName.skeleton
  spriteImage = resources.images['skeleton']
  motions = skeletonMotions
  protected _strength = 50
  protected _criticalAttackChance = 0.5
  protected _criticalAttackLevel = 0.3
  protected _stamina = 10
  protected _successDefenceChance = 0.25
  protected _successDefenceLevel = 0.1
  protected _healthResourse = initResource(40)
  constructor() {
    super()
    this.brain = new PatrolMonsterAi(this)
  }
}
