import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'
import SCENES from '@constants/scenes'
import { RootState } from '@store/index'
import { resetHeroResources } from '@store/slices/hero'
import { computeScore } from '@utils/computeScore'
import {
  gameInitialState,
  LifeControllerState,
  GameIntaractions,
  noInteraction,
} from '@constants/game'
import { TEAM_NAME_LB_API } from '@constants/api'
import type { GameSlice, GameStats, GameIntaractionDef } from '@constants/game'
import { selectHeroIsDead } from '@store/selectors'
import leaderboardApi, {
  LeaderboardData,
  LeaderboardDataReq,
  LeaderboardDataResp,
} from '@api/leaderboardApi'
import { getLBData, putLBData } from '@services/leaderboardController'
import ROUTES from '@constants/routes'
import { useNavigate } from 'react-router-dom'

const updateTotals = (state: GameSlice) => {
  state.gameTotals.coins += state.levelStats.coins
  state.gameTotals.killCount += state.levelStats.killCount
  state.gameTotals.steps += state.levelStats.steps
  state.gameTotals.time += state.levelStats.time
  state.score += computeScore(state.levelStats, state.currentLevel)
}

const gameSlice = createSlice({
  name: 'game',
  initialState: gameInitialState,
  reducers: {
    // levels
    startLevel(state, action: PayloadAction<number>) {
      const nextLevel = action.payload
      if (nextLevel > state.totalLevels) {
        // просто защита. Решение начинать/не начинать уровень по идее принимает контроллер
        return
      }
      return {
        ...state,
        currentLevel: nextLevel,
        levelStats: gameInitialState.levelStats,
        levelComplete: false,
        currentScene: SCENES.MAP_SCENE,
        lifeControllerState: LifeControllerState.RUNNING,
      }
    },
    endLevel(state) {
      state.levelComplete = true
      state.lifeControllerState = LifeControllerState.PAUSED
      updateTotals(state)
      state.currentScene = SCENES.RESULT_SCENE
    },
    // game
    pauseGame(state) {
      state.lifeControllerState = LifeControllerState.PAUSED
    },
    resumeGame(state) {
      state.currentScene = SCENES.MAP_SCENE
      state.lifeControllerState = LifeControllerState.RUNNING
    },
    exitGame(state) {
      state.currentScene = SCENES.LOAD_SCENE
      state.lifeControllerState = LifeControllerState.PAUSED
      state.levelStats = gameInitialState.levelStats
    },
    die(state) {
      // DEPRICATED
      state.lifeControllerState = LifeControllerState.PAUSED
      state.currentScene = SCENES.RESULT_SCENE
    },
    regInteraction(state, action: PayloadAction<GameSlice['interaction']>) {
      state.interaction = action.payload
    },
    clearInteractions(state) {
      state.interaction = noInteraction
    },
    // scenes
    showLoadScene(state) {
      // TODO скорее всего, не нужно здесь
      state.currentScene = SCENES.LOAD_SCENE
    },
    showStartScene(state) {
      // Используется в хуке useNavToGame. Возможно будет удаляться
      state.currentScene = SCENES.START_SCENE
    },
    showResultScene(state) {
      state.currentScene = SCENES.RESULT_SCENE
    },
    // stats
    resetTotals(state) {
      state.gameTotals = gameInitialState.gameTotals
      state.score = gameInitialState.score
    },
    cancelLevelStats(state, action: PayloadAction<GameSlice['levelStats']>) {
      const statDeltas = action.payload
      state.gameTotals = {
        ...state.gameTotals,
        ...Object.keys(statDeltas).reduce((result, current) => {
          const key = current as keyof typeof statDeltas
          return Object.assign(result, {
            [current]: state.gameTotals[key] - (statDeltas[key] || 0),
          })
        }, {}),
      }
      state.score -= computeScore(statDeltas, state.currentLevel)
    },
    updateStats(
      state,
      action: PayloadAction<Partial<GameSlice['levelStats']>>
    ) {
      const statDeltas = action.payload
      state.levelStats = {
        ...state.levelStats,
        ...Object.keys(statDeltas).reduce((result, current) => {
          const key = current as keyof typeof statDeltas
          return Object.assign(result, {
            [current]: state.levelStats[key] + (statDeltas[key] || 0),
          })
        }, {}),
      }
    },
  },
})

export const {
  startLevel,
  endLevel,
  pauseGame,
  resumeGame,
  exitGame,
  die,
  regInteraction,
  clearInteractions,
} = gameSlice.actions

export const { showLoadScene, showStartScene, showResultScene } =
  gameSlice.actions

export const { resetTotals, updateStats, cancelLevelStats } = gameSlice.actions

export const startGame =
  (): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    dispatch(resetHeroResources())
    dispatch(resetTotals())
    dispatch(startLevel(1))
  }
export const restartLevel =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { currentLevel, levelStats, currentScene } = getState().game
    dispatch(resetHeroResources())
    if (SCENES.RESULT_SCENE == currentScene) {
      dispatch(cancelLevelStats(levelStats))
    }
    dispatch(startLevel(currentLevel))
    if (SCENES.MAP_SCENE == currentScene) {
      const stats = getState().game.levelStats
      const lbData: LeaderboardData = {
        data: {
          nickname: getState().user.data.display_name,
          coins: stats.coins,
          steps: stats.steps,
          killCount: stats.killCount,
          time: stats.time,
          score: getState().game.score,
        },
        ratingFieldName: 'score',
        teamName: TEAM_NAME_LB_API,
      }
      putLBData(lbData)
      dispatch(showStartScene())
    }
  }
export const finishLevel =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch(endLevel())

    if (!selectHeroIsDead(getState())) {
      const stats = getState().game.levelStats
      const lbData: LeaderboardData = {
        data: {
          nickname: getState().user.data.display_name,
          coins: stats.coins,
          steps: stats.steps,
          killCount: stats.killCount,
          time: stats.time,
          score: getState().game.score,
        },
        ratingFieldName: 'score',
        teamName: TEAM_NAME_LB_API,
      }

      const req: LeaderboardDataReq = {
        ratingFieldName: 'score',
        cursor: 0,
        limit: 10,
      }

      getLBData(req).then((data: LeaderboardDataResp[]) => {
        const el = data.filter(
          user => user.data.nickname == getState().user.data.display_name
        )[0]
        if (!el || el.data.score < getState().game.score) {
          putLBData(lbData).then(() => {
            if (window.Notification && Notification.permission !== 'denied') {
              Notification.requestPermission(function (status) {
                const n = new Notification('One Bit Dungeon', {
                  body: 'Congratulations! Your data was saved, check the leaderboard!',
                  tag: 'one-bit-not',
                  icon: '../../../assets/images/knight-head.png',
                })
                n.onclick = () => {
                  window.location.assign('/leaderboard')
                }
              })
            }
          })
        }
      })
    }
  }
export const nextLevel =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { currentLevel } = getState().game
    dispatch(resetHeroResources())
    dispatch(startLevel(currentLevel + 1))
  }

export default gameSlice.reducer

export { LifeControllerState, GameIntaractions }
export type { GameStats, GameIntaractionDef }
