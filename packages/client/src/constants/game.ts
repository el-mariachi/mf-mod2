import SCENES from '@constants/scenes'
import { GameInteractionDef, GameInteractionType } from '@game/core/types'

export enum LifeControllerState {
  RUNNING,
  PAUSED,
}

// DEPRICATED ?
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

export enum GameStatType {
  COINS = 'coins',
  STEPS = 'steps',
  KILLS = 'killCount',
  TIME = 'time',
}
export type GameStats = {
  [key in GameStatType]: number
}

export type GameSlice = {
  lifeControllerState: LifeControllerState
  currentScene: SCENES
  interaction: GameInteractionDef
  currentLevel: number
  totalLevels: number
  levelComplete: boolean
  levelStats: GameStats
  gameTotals: GameStats
  score: number
}

export const noInteraction: GameInteractionDef = {
  type: GameInteractionType.none,
}

export const gameInitialState: GameSlice = {
  lifeControllerState: LifeControllerState.PAUSED,
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
