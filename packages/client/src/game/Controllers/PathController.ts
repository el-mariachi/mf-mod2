import * as Types from '@types/game'
import patrolPaths from '@game/data/patrolPaths.json'

export default class PathController {
  level: number = 0
  constructor(level: number) {
    this.level = level
  }
  getPath(position: Types.Coords) {
    const levelPaths = patrolPaths[this.level - 1] as unknown as Record<
      string,
      Types.Coords[]
    >
    const pathID = position.join('-')
    return levelPaths[pathID]
  }
}
