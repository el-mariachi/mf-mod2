import reducer, {
  collectCoins,
  finishLevel,
  GameState,
  kill,
  NextMove,
  startGame,
  step,
} from '@store/slices/game'
import SCENES from '@constants/scenes'

const initialState = {
  gameState: GameState.PAUSED,
  currentScene: SCENES.LOAD_SCENE,
  currentLevel: 1,
  totalLevels: 1,
  nextMove: NextMove.PLAYER,
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
}

describe('Testing game slice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })
  it('should set map scene and set running state', () => {
    expect(reducer(initialState, startGame())).toEqual({
      ...initialState,
      currentScene: SCENES.MAP_SCENE,
      gameState: GameState.RUNNING,
    })
  })
  it('should update game totals upon level finish', () => {
    const levelStats = {
      killCount: 32,
      coins: 50,
      time: 500,
      steps: 200,
    }
    const prevState = { ...initialState, levelStats }
    expect(reducer(prevState, finishLevel())).toEqual({
      ...initialState,
      gameTotals: {
        killCount: 32,
        coins: 50,
        time: 500,
        steps: 200,
      },
      currentScene: SCENES.RESULT_SCENE,
    })
  })
  it('should update steps count in levelStats', () => {
    expect(reducer(initialState, step()).levelStats.steps).toBe(1)
  })
  it('should update kill count in levelStats', () => {
    expect(reducer(initialState, kill()).levelStats.killCount).toBe(1)
  })
  it('should update coins count in levelStats', () => {
    expect(reducer(initialState, collectCoins(42)).levelStats.coins).toBe(42)
  })
})
