import SCENES from '@constants/scenes'
import * as Types from '@type/game'

export const MAP_CELL = 32
export const SPRITE_SIZE: Types.Size = [MAP_CELL, MAP_CELL]
export const STEP_TIME = 1000
export const DEF_FRAME_PER_SECOND_SPEED = 7
export const DEF_MOVE_DURATION = 500
export const HERO_MOVE_DELAY = 10

// TODO need refactoring for motions/behaviors types
export const motionTypes: Types.MotionTypes = {
  ...Types.IdleMotionType,
  ...Types.MoveMotionType,
  ...Types.AttackMotionType,
  ...Types.DestructionMotionType,
  ...Types.DamageMotionType,
  ...Types.TurnMotionType,
  ...Types.UnspecifiedMotionType,
}

export const emptyAnimationResult = {
  params: null,
  reason: 'end',
} as Types.CellSpriteAnimationProcessResult
export const emptyAnimationProcess = Promise.resolve(
  emptyAnimationResult
) as Types.CellSpriteAnimationProcess

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
  interaction: Types.GameInteractionDef
  currentLevel: number
  totalLevels: number
  levelComplete: boolean
  levelStats: GameStats
  gameTotals: GameStats
  score: number
}

export const noInteraction: Types.GameInteractionDef = {
  type: Types.GameInteractionType.none,
}
export const noInteractionRes = Promise.resolve(noInteraction)

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
