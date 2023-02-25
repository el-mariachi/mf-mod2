import * as Types from '@type/game'
import _Hero from './Hero'
import { knightMotions } from '@game/animations/knight'
import knightSrc from '@sprites/knight.png'

export default class Knight extends _Hero {
  heroClass = Types.HeroClass.knight
  spriteSrc = knightSrc
  motions = knightMotions
  // TODO further, belows will calculate and depends on level, equipments, weapons, etc
  get strength() {
    return 50
  }
  get criticalAttackChance() {
    return 0.25
  }
  get criticalAttackLevel() {
    return 0.05
  }
  get stamina() {
    return 20
  }
  get successDefenceChance() {
    return 0.05
  }
  get successDefenceLevel() {
    return 0.01
  }
}
