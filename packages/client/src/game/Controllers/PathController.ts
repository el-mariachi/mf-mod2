import * as Types from '@type/game'
// TODO need to load dynamically by levelNum from store
import patrolPaths from '@game/data/levels/1/patrolPaths.json'

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
