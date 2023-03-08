import * as Types from '@type/game'
import Behaviors from '@game/behaviors'
import * as Utils from '@utils/game'
import DullAi from './DullAi'
import { zeroLevelMap } from '@game/controllers/MapController'

export default class PatrolMonsterAi extends DullAi {
  protected _patrolPath!: Types.Path
  protected _goal!: Types.Coords
  protected static readonly _IDLE_CHANCE = 0.1
  constructor(
    npc: Types.Monster & Types.Movable,
    knownMap: Types.LevelMap = zeroLevelMap,
    patrolPath: Types.Path = [[0, 0]],
    public viewArea: number = 3
  ) {
    super(npc, knownMap)
    this.patrolPath = patrolPath
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
  makeDecision(): Types.BehaviorDecision {
    const subject = this._npc
    const curPos = this._position

    const heroCell = Utils.getMapCellsAround(this._knownMap, curPos, 1).find(
      cell => cell.gameObjects.some(item => Utils.isHero(item))
    )
    if (heroCell) {
      const heroPos = Utils.rowcol2coords(heroCell.position)
      const dir = Utils.defineAxisDir(curPos, heroPos)
      if (dir) {
        return {
          subject,
          behavior: Types.AttackMotionType.attack as Types.BehaviorDef,
          object: heroCell.gameObjects.find(item => Utils.isHero(item)),
          dir,
          target: heroCell,
        }
      }
    }
    if (Utils.isCoordsEqual(curPos, this._goal)) {
      this._defineNextGoal()
    }
    const dir = Utils.defineAxisDir(curPos, this._goal)
    if (dir) {
      const nextPos = Utils.actualizeCellCoords(
        Utils.nearestCoords(curPos, dir)
      )
      if (!Utils.isCoordsEqual(curPos, nextPos)) {
        const [row, col] = Utils.coords2rowcol(nextPos)
        const target = this._knownMap[row][col]
        const { gameObjects } = target
        const behavior = (
          (!gameObjects.length || gameObjects.every(item => item.crossable)) &&
          Math.random() >= PatrolMonsterAi._IDLE_CHANCE
            ? Types.MoveMotionType.move
            : Types.IdleMotionType.idle
        ) as Types.BehaviorDef
        return {
          subject,
          behavior,
          dir,
          target,
        }
      }
    }
    return {
      subject,
      behavior: Behaviors.doNothing.type,
    }
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
