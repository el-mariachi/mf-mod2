import GameObject from './GameObject'
import tileset from '@sprites/tileset.png'
import * as Types from '@game/core/types'

export default class RightGateLeaf extends GameObject {
  name = Types.GameEntourageName.rightGateLeaf
  spritePos =  [7,3] as Types.Coords
  crossable = false
  static = true
  animated = false
  destroyable = false
}
