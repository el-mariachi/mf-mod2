import * as Types from '@game/core/types'
import * as Behaviors from '@game/animations/behavior'
import UnitAI from '@game/core/AI/UnitAI'
import Skeleton from '@game/Objects/Skeleton'
import * as Utils from '@game/utils'
import Hero from '@game/Objects/Hero'

export default class PatrolMonsterAI extends UnitAI {
  protected _patrolPath!: Types.Path
  protected _goal!: Types.Coords
  protected static readonly _IDLE_CHANCE = 0.2
  constructor(
    levelMap: Types.LevelMap,
    // TODO need to refactor game objects hierarchy and use Monster or Unit type here
    monster: Skeleton,
    patrolPath: Types.Path,
    public viewArea: number = 3
  ) {
    super(levelMap, monster)
    this.patrolPath = patrolPath
  }
  protected get _position() {
    return this._monster.view.position
  }
  get patrolPath() {
    return this._patrolPath
  }
  set patrolPath(nextPatrolPath: Types.Path) {
    this._patrolPath = []
    if (!nextPatrolPath.length) {
      this._patrolPath.push(this._position)
    } else this._patrolPath = nextPatrolPath

    this._goal = this.patrolPath[0]
  }
  makeDecision() {
    const curPos = this._position

    const heroCell = Utils.getMapCellsAround(this._levelMap, curPos, 1).find(
      cell => cell.gameObjects.some(item => item instanceof Hero)
    )
    if (heroCell) {
      const dir = Utils.defineDir(
        curPos,
        Utils.rowcol2coords(heroCell.position)
      )
      if (dir) {
        return Behaviors[`attack2${dir}`]
      }
    }
    if (Utils.isCoordsEqual(curPos, this._goal)) {
      this._defineNextGoal()
    }
    const dir = Utils.defineDir(curPos, this._goal)
    if (dir) {
      const nextPos = Utils.actualizeCellCoords(
        Utils.nearestCoords(curPos, dir)
      )
      if (!Utils.isCoordsEqual(curPos, nextPos)) {
        const [col, row] = nextPos
        const cellObjects = this._levelMap[row][col].gameObjects
        const action =
          (!cellObjects.length || cellObjects.every(item => item.crossable)) && Math.random() >= PatrolMonsterAI._IDLE_CHANCE
            ? 'move'
            : 'look'
        return Behaviors[`${action}2${dir}`]
      }
    }
    return Behaviors.doNothing
  }
  protected _defineNextGoal() {
    const pathLength = this.patrolPath.length
    if (pathLength > 1) {
      let pathInd = this.patrolPath.findIndex(item =>
        Utils.isCoordsEqual(item, this._goal)
      )
      if (pathInd == pathLength - 1) {
        this._patrolPath = this.patrolPath.reverse()
        pathInd = 0
      }
      this._goal = this.patrolPath[++pathInd]
    }
  }
}
