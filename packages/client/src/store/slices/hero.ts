import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'
import type { RootState } from '@store/index'
import { createRangeKeeper } from '@utils/index'
import { heroPresets, heroInitialState } from '@constants/hero'
import type { HeroSlice } from '@constants/hero'

const heroSlice = createSlice({
  name: 'hero',
  initialState: heroInitialState,
  reducers: {
    setHeroClass(state, action: PayloadAction<HeroSlice['heroClass']>) {
      state.heroClass = action.payload
      state.health = heroInitialState.maxHealth
      state.resources = heroPresets[state.heroClass]
      state.resourceMaxValues = heroInitialState.resourceMaxValues
    },
    resetHeroResources(state) {
      state.resources = heroPresets[state.heroClass]
      state.health = heroInitialState.maxHealth
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
      action: PayloadAction<Partial<(typeof heroInitialState)['resources']>>
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
      action: PayloadAction<Partial<(typeof heroInitialState)['resources']>>
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
      action: PayloadAction<
        Partial<(typeof heroInitialState)['resourceMaxValues']>
      >
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
  dispatch => {
    dispatch(updateHealth(amount))
    // it could be handy, but buisness-logic in store makes controller code tricky oO
    // const { hero } = getState()
    // if (hero.health <= 0) {
    //   dispatch(die())
    // }
  }

export default heroSlice.reducer
