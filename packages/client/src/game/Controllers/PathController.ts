import * as Types from '@game/core/types'
import PatrolPaths from '@game/core/AI/PatrolPaths'

export default class PathController {
  level: number = 0
  constructor(level: number) {
    this.level = level
  }
  getPath(position: Types.Coords) {
    const levelPaths = PatrolPaths[this.level - 1] as unknown as  Record<string, Types.Coords[]>
    const pathID = position.join("-")
    return levelPaths[pathID]
  }
}
