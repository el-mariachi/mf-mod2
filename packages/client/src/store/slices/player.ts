import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'
import type { RootState } from '@store/index'
import { pauseGame } from '@store/slices/game'

export enum PlayerClass {
  L3X3III = 'L3X3III',
  GINEFF = 'GINEFF',
  TAURENGOLD = 'TAURENGOLD',
  NEON_KONCH = 'NEON_KONCH',
  MITSON = 'MITSON',
}

const propMaxValues = {
  skill: 256,
  hits: 256,
  strength: 256,
  armor: 256,
}

type PlayerProps = typeof propMaxValues
type PlayerPropName = keyof PlayerProps

const keepInRange = (prop: PlayerPropName, value: number): number => {
  return Math.max(0, Math.min(propMaxValues[prop], value))
}

const playerPresets = {
  [PlayerClass.L3X3III]: {
    skill: 32,
    hits: 32,
    strength: 128,
    armor: 64,
  },
  [PlayerClass.GINEFF]: {
    skill: 32,
    hits: 64,
    strength: 128,
    armor: 32,
  },
  [PlayerClass.TAURENGOLD]: {
    skill: 64,
    hits: 64,
    strength: 64,
    armor: 64,
  },
  [PlayerClass.NEON_KONCH]: {
    skill: 32,
    hits: 128,
    strength: 64,
    armor: 32,
  },
  [PlayerClass.MITSON]: {
    skill: 32,
    hits: 32,
    strength: 64,
    armor: 128,
  },
}

const initialState = {
  playerClass: PlayerClass.L3X3III,
  props: playerPresets[PlayerClass.L3X3III],
  health: 100,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    init() {
      return initialState
    },
    setClass(state, action: PayloadAction<typeof initialState.playerClass>) {
      const playerClass = action.payload
      state.playerClass = playerClass
      state.props = playerPresets[playerClass]
      state.health = 100
    },
    reset(state) {
      state.props = playerPresets[state.playerClass]
      state.health = 100
    },
    upSkill(state, action: PayloadAction<number>) {
      const newValue = state.props.skill + action.payload
      state.props.skill = keepInRange('skill', newValue)
    },
    downSkill(state, action: PayloadAction<number>) {
      const newValue = state.props.skill - action.payload
      state.props.skill = keepInRange('skill', newValue)
    },
    upHits(state, action: PayloadAction<number>) {
      const newValue = state.props.hits + action.payload
      state.props.hits = keepInRange('hits', newValue)
    },
    downHits(state, action: PayloadAction<number>) {
      const newValue = state.props.hits - action.payload
      state.props.hits = keepInRange('hits', newValue)
    },
    upStrength(state, action: PayloadAction<number>) {
      const newValue = state.props.strength + action.payload
      state.props.strength = keepInRange('strength', newValue)
    },
    downStrength(state, action: PayloadAction<number>) {
      const newValue = state.props.strength - action.payload
      state.props.strength = keepInRange('strength', newValue)
    },
    upArmor(state, action: PayloadAction<number>) {
      const newValue = state.props.armor + action.payload
      state.props.armor = keepInRange('armor', newValue)
    },
    downArmor(state, action: PayloadAction<number>) {
      const newValue = state.props.armor - action.payload
      state.props.armor = keepInRange('armor', newValue)
    },
    heal(state, action: PayloadAction<number>) {
      const newValue = state.health + action.payload
      state.health = Math.min(100, newValue)
    },
    injure(state, action: PayloadAction<number>) {
      const newValue = state.health - action.payload
      state.health = Math.max(0, newValue)
    },
  },
})

export const { init, reset, setClass } = playerSlice.actions

export const {
  upArmor,
  upHits,
  upSkill,
  upStrength,
  downArmor,
  downHits,
  downSkill,
  downStrength,
} = playerSlice.actions

export const { heal, injure } = playerSlice.actions

export const bite =
  (amount: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch(injure(amount))
    const { player } = getState()
    if (player.health <= 0) {
      dispatch(pauseGame())
    }
  }

export default playerSlice.reducer
