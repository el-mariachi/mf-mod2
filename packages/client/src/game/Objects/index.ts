import tileset from '@sprites/tileset.png'
import * as Types from '@game/core/types'
import GameObject from './GameObject'
import Hero from './Hero'
import Skeleton from './Skeleton'
import Wall from './Wall'
import TrapDoor from './TrapDoor'
import Coin from './Coin'
import Chest from './Chest'
import Key from './Key'
import Bottle from './Bottle'
import Gate from './Gate'

// prettier-ignore
const objects: Record<number, typeof GameObject> = {
  1: Hero,
  6: class RightWall1 extends Wall { spritePos = [5, 0] as Types.Coords},
  7: class RightWall2 extends Wall { spritePos = [5, 1] as Types.Coords},   
  8: class LeftWall1 extends Wall { spritePos = [0, 2] as Types.Coords},
  9: class LeftWall2 extends Wall { spritePos = [0, 1] as Types.Coords},
  10: class TopWallUp1 extends Wall { spritePos = [1, 0] as Types.Coords},
  11: class TopWallUp2 extends Wall { spritePos = [2, 0] as Types.Coords}, 
  12: class TopWallUp3 extends Wall { spritePos = [3, 0] as Types.Coords},
  13: class Bottom1 extends Wall { spritePos = [1, 5] as Types.Coords},
  14: class Bottomt2 extends Wall { spritePos = [2, 5] as Types.Coords}, 
  15: Wall, 
  16: class CornerTopLeft extends Wall { spritePos = [0, 5] as Types.Coords},
  17: class CornerTopRight extends Wall { spritePos = [5, 5] as Types.Coords},
  18: class CornerBottomRight extends Wall { spritePos = [5, 4] as Types.Coords},
  19: class CornerBottomLeft extends Wall { spritePos = [0, 4] as Types.Coords},
  20: class GateLeft extends Gate { spritePos = [6, 6] as Types.Coords},
  21: class GateRight extends Gate { spritePos = [7, 6] as Types.Coords},
  22: TrapDoor,
  40: Skeleton,
  30: Coin,
  31: Chest,
  32: Key,
  33: Bottle,
}

export default objects
