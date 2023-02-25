import { HeroClass } from '@type/game'
import _Hero from './Hero'
import Archer from './Archer'
import Knight from './Knight'
import Wizard from './Wizard'

const heroClasses: Record<HeroClass, typeof _Hero> = {
  [HeroClass.knight]: Knight,
  [HeroClass.archer]: Archer,
  [HeroClass.wizard]: Wizard,
}
export default heroClasses
