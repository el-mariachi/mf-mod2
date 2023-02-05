import GameObject, {SpriteDescription} from './GameObject'
import tileset from '@sprites/dungeonTileset.png'
import * as Types from '@game/core/types'

export default class Wall extends GameObject{
  name = Types.GameEntourageName.wall
  sprite = { source: tileset, position: [1, 0] } as SpriteDescription
  crossable = false
  static = true
  animated = false
  estroyable = false
}
