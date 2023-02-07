import * as Types from '@game/core/types'
import Skeleton from "@game/Objects/Skeleton"
import SmartSkeleton from '@game/mocks/SmartSkeleton'
import PatrolMonsterAI from '@game/core/AI/PatrolMonsterAI'
import { isCoordsEqual } from '@game/utils'


// TODO мб использовать просто tuple . тогда не придется заморачиваться с Map.forEach 

// type SkeletonPaths = Map<Skeleton, Types.Path>
type SkeletonPaths = [Types.LevelMapCell, Types.Path][]
//Map<Types.LevelMapCell, Types.Path>

type StepResult = Promise<[SmartSkeleton, Types.Coords]>[]

const STEP_DELAY = 750
function giveStep(skeletons: SmartSkeleton[]) 
{
  const steps = skeletons.map(skeleton => {
    const stepInteraction = skeleton.doStep()

    // console.log(stepInteraction);

    

    if (stepInteraction.animation)
    {
      // TODO баг - не завершается анимация. возможно потому что старый функционал 
      // return Promise.resolve([skeleton, skeleton.view.position])
      return stepInteraction.animation.then(() => [skeleton, skeleton.view.position])
    }
    else
      return Promise.resolve([skeleton, skeleton.view.position])
  })
  console.log('4003', steps);
  return steps as StepResult
}
function refreshSkeletonOnMap(map:Types.LevelMap, skeleton:SmartSkeleton, nextPosition:Types.Coords) {
  const curPosition = skeleton.cell.position
  if (!isCoordsEqual(curPosition, nextPosition))
  {
    const [cCol, cRow] = curPosition
    const curCell = map[cRow][cCol]
    curCell.gameObjects = curCell.gameObjects.filter(item => item !== skeleton.subject) 

    const [rCol, rRow] = nextPosition
    const resCell = map[rRow][rCol]            
    resCell.gameObjects.push(skeleton.subject)
    skeleton.cell = resCell
  }
}
function doLife (map:Types.LevelMap, step:()=>StepResult)
{
  const lifeCircle = () => {
    const worldStepDelay = new Promise<void>(resolve => setTimeout(() => resolve(), STEP_DELAY))
    const stepProcess = Promise.all(step()).then(stepsResult => 
    {
      console.log(stepsResult);
      stepsResult.forEach(stepResult => 
      {
        const [skeleton, resPosition] = stepResult
        refreshSkeletonOnMap(map, skeleton, resPosition)

        // const curPosition = skeleton.cell.position
        // if (!isCoordsEqual(curPosition, resPosition))
        // {
        //   const [cCol, cRow] = curPosition
        //   const curCell = map[cRow][cCol]
        //   // curCell.gameObjects = curCell.gameObjects.filter(item => !(item instanceof Skeleton)) 
        //   curCell.gameObjects = curCell.gameObjects.filter(item => item !== skeleton.subject) 

        //   const [rCol, rRow] = resPosition
        //   const resCell = map[rRow][rCol]            
        //   resCell.gameObjects.push(skeleton.subject)
        //   skeleton.cell = resCell
        // }
      })
    })
    Promise.all([worldStepDelay, stepProcess]).finally(() => console.log(map))
    //.finally(() => lifeCircle())
  }
  lifeCircle()
}

export function aiDemo(levelMap:Types.LevelMap) {
  const skeletonPathes : SkeletonPaths = [
    [
      levelMap[2][7], // skeleton init cell 
      [[7,2], [6,2], [6,4]]
    ]
  ]
  const skeletons = skeletonPathes.map(([cell, path]) => 
  {
    const skeleton = cell.gameObjects.find(item => item instanceof Skeleton) as Skeleton
    const brain = new PatrolMonsterAI(levelMap, skeleton, path)
    return new SmartSkeleton(skeleton, brain, cell)
  })
  // skeletonPathes.forEach((path, skeleton) => 
  // {
  //   const brain = new PatrolMonsterAI(levelMap, skeleton, path)
  //   skeletons.push(new SmartSkeleton(skeleton, brain))
  // })

  // console.log(skeletonPathes, skeletons);
  doLife(levelMap, () => giveStep(skeletons))
}
