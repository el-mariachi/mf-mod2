import Wall from './Wall'
import LeftGateLeaf from './LeftGateLeaf'
import RightGateLeaf from './RightGateLeaf'
import GameObject from './GameObject'

const ObjectEntries: Array<[number, typeof GameObject]> = [
  [1, Wall],
  [10, LeftGateLeaf],
  [11, RightGateLeaf],
]

export default ObjectEntries
