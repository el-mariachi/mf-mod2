import SCENES from '@constants/scenes'

export enum TurnControllerState {
  RUNNING,
  PAUSED,
}

export enum GameIntaractions {
  NONE = 'none',
  ATTACK = 'attack',
  DAMAGE = 'damage',
  COLLECT = 'collect',
  OPEN = 'open',
  // ...
}

export type GameIntaractionDef = {
  type: GameIntaractions
  progress: number
  position: [number, number]
  // ...
}

export type GameStats = {
  killCount: number
  coins: number
  time: number
  steps: number
}

export type GameSlice = {
  turnControllerState: TurnControllerState
  currentScene: SCENES
  interaction: GameIntaractionDef // | null // как вариант
  currentLevel: number
  totalLevels: number
  levelComplete: boolean
  levelStats: GameStats
  gameTotals: GameStats
  score: number
}

const noInteraction: GameIntaractionDef = {
  type: GameIntaractions.NONE,
  progress: 0,
  position: [0, 0],
}

export const gameInitialState: GameSlice = {
  turnControllerState: TurnControllerState.PAUSED,
  currentScene: SCENES.LOAD_SCENE,
  interaction: noInteraction,
  currentLevel: 0,
  totalLevels: 1,
  levelComplete: false,
  levelStats: {
    killCount: 0,
    coins: 0,
    time: 0,
    steps: 0,
  },
  gameTotals: {
    killCount: 0,
    coins: 0,
    time: 0,
    steps: 0,
  },
  score: 0,
}
