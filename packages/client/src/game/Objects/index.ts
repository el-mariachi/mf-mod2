import GameObject from './GameObject'
import Hero from './Hero'
import Skeleton from './Skeleton'
import Wall from './Wall'
import Coin from './Coin'
import Chest from './Chest'
import Key from './Key'
import Bottle from './Bottle'
import LeftGateLeaf from './LeftGateLeaf'
import RightGateLeaf from './RightGateLeaf'

const objects: Record<number, typeof GameObject> = {
  1: Hero,
  10: LeftGateLeaf,
  11: RightGateLeaf,
  12: Wall,
  20: Skeleton,
  30: Coin,
  31: Chest,
  32: Key,
  33: Bottle,
}

export default objects
