import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'
import type { RootState } from '@store/index'
import { die } from '@store/slices/game'
import { createRangeKeeper } from '@utils/index'
import {
  HeroClass,
  heroPresets,
  defaultMaxValues,
  defaultMaxHealth,
} from '@constants/hero'

const initialState = {
  heroClass: HeroClass.L3X3III,
  health: defaultMaxHealth,
  maxHealth: 100,
  resources: heroPresets[HeroClass.L3X3III],
  resourceMaxValues: defaultMaxValues,
}

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroClass(
      state,
      action: PayloadAction<typeof initialState['heroClass']>
    ) {
      state.heroClass = action.payload
      state.health = defaultMaxHealth
      state.resources = heroPresets[state.heroClass]
      state.resourceMaxValues = defaultMaxValues
    },
    resetHeroResources(state) {
      state.resources = heroPresets[state.heroClass]
      state.health = defaultMaxHealth
    },
    updateHealth(state, action: PayloadAction<number>): void {
      const newValue = state.health + action.payload
      const keepHealthInRange = createRangeKeeper(0, state.maxHealth)
      state.health = keepHealthInRange(newValue)
    },
    setHealthMaxValue(state, action: PayloadAction<number>) {
      state.maxHealth = action.payload
    },
    setResource(
      // just setst the resource(s) to specified value
      // allows any subset of resources
      // no limit checks
      state,
      action: PayloadAction<Partial<typeof initialState['resources']>>
    ) {
      state.resources = {
        ...state.resources,
        ...action.payload,
      }
    },
    updateResourceByAmount(
      // will update the provided resource(s) with delta(s)
      // limits resulting value to range
      state,
      action: PayloadAction<Partial<typeof initialState['resources']>>
    ) {
      const resourceDeltas = action.payload
      state.resources = {
        ...state.resources,
        ...Object.keys(resourceDeltas).reduce((result, current) => {
          const key = current as keyof typeof resourceDeltas
          const keepResourceInRange = createRangeKeeper(
            0,
            state.resourceMaxValues[key]
          )
          return Object.assign(result, {
            [current]: keepResourceInRange(
              state.resources[key] + (resourceDeltas[key] || 0)
            ),
          })
        }, {}),
      }
    },
    setResourceMaxValue(
      state,
      action: PayloadAction<Partial<typeof initialState['resourceMaxValues']>>
    ) {
      state.resourceMaxValues = {
        ...state.resourceMaxValues,
        ...action.payload,
      }
    },
  },
})

export const {
  resetHeroResources,
  setHeroClass,
  setResource,
  setResourceMaxValue,
  updateHealth,
  setHealthMaxValue,
  updateResourceByAmount,
} = heroSlice.actions

export const updateHealthByAmount =
  (amount: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch(updateHealth(amount))
    const { hero } = getState()
    if (hero.health <= 0) {
      dispatch(die())
    }
  }

export default heroSlice.reducer
