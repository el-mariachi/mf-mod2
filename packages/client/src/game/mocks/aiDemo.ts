import * as Types from '@game/core/types'
import Skeleton from '@game/Objects/Skeleton'
import SmartSkeleton from '@game/mocks/SmartSkeleton'
import PatrolMonsterAI from '@game/core/AI/PatrolMonsterAI'
import { isCoordsEqual, rowcol2coords } from '@game/utils'

type SkeletonPaths = [Types.LevelMapCell, Types.Path][] // is ['skeleton init pos', 'path coords'][]
type StepResult = Promise<[SmartSkeleton, Types.Coords]>[]

const STEP_DELAY = 750
function giveStep(skeletons: SmartSkeleton[]) {
  return skeletons.map(skeleton => {
    const stepInteraction = skeleton.doStep()
    return stepInteraction.animation
      ? stepInteraction.animation.then(() => [skeleton, skeleton.view.position])
      : Promise.resolve([skeleton, skeleton.view.position])
  }) as StepResult
}
function refreshSkeletonOnMap(
  map: Types.LevelMap,
  skeleton: SmartSkeleton,
  nextPosition: Types.Coords
) {
  const curPosition = rowcol2coords(skeleton.cell.position)
  if (!isCoordsEqual(curPosition, nextPosition)) {
    const [cCol, cRow] = curPosition
    const curCell = map[cRow][cCol]
    curCell.gameObjects = curCell.gameObjects.filter(
      item => item !== skeleton.subject
    )
    const [rCol, rRow] = nextPosition
    const resCell = map[rRow][rCol]
    resCell.gameObjects.push(skeleton.subject)
    skeleton.cell = resCell
  }
}
function makeLife(map: Types.LevelMap, step: () => StepResult) {
  const lifeCircle = () => {
    const worldStepDelay = new Promise<void>(resolve =>
      setTimeout(() => resolve(), STEP_DELAY)
    )
    const stepProcess = Promise.all(step()).then(stepsResult => {
      stepsResult.forEach(stepResult => {
        const [skeleton, resPosition] = stepResult
        refreshSkeletonOnMap(map, skeleton, resPosition)
      })
    })
    Promise.all([worldStepDelay, stepProcess]).finally(() => lifeCircle())
  }
  lifeCircle()
}

export function AIDemo(levelMap: Types.LevelMap) {
  const skeletonPathes: SkeletonPaths = [
    [
      levelMap[1][9],
      [
        [9, 1],
        [7, 1],
        [7, 3],
      ],
    ],
    [
      levelMap[4][3],
      [
        [3, 4],
        [1, 4],
      ],
    ],
    [
      levelMap[14][4],
      [
        [4, 14],
        [3, 14],
        [10, 14],
      ],
    ],
    [
      levelMap[12][10],
      [
        [10, 12],
        [8, 12],
        [8, 14],
        [10, 14],
        [10, 12],
      ],
    ],
  ]
  const skeletons = skeletonPathes.map(([cell, path]) => {
    const skeleton = cell.gameObjects.find(
      item => item instanceof Skeleton
    ) as Skeleton
    const brain = new PatrolMonsterAI(levelMap, skeleton, path)
    return new SmartSkeleton(skeleton, brain, cell)
  })
  makeLife(levelMap, () => giveStep(skeletons))
}
