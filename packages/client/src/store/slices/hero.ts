import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createRangeKeeper } from '@utils/index'
import { HeroClass, heroPresets, defaultMaxValues } from '@constants/hero'

const initialState = {
  heroClass: HeroClass.L3X3III,
  health: 100,
  resources: heroPresets[HeroClass.L3X3III],
  resourceMaxValues: defaultMaxValues,
}

const keepHealthInRange = createRangeKeeper(0, 100)

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroClass(
      state,
      action: PayloadAction<typeof initialState['heroClass']>
    ) {
      state.heroClass = action.payload
      state.health = 100
      state.resources = heroPresets[state.heroClass]
      state.resourceMaxValues = defaultMaxValues
    },
    resetHero(state) {
      state.resources = heroPresets[state.heroClass]
      state.health = 100
    },
    updateHealthByAmount(state, action: PayloadAction<number>): void {
      state.health = keepHealthInRange(state.health + action.payload)
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
  resetHero,
  setHeroClass,
  setResource,
  setResourceMaxValue,
  updateHealthByAmount,
  updateResourceByAmount,
} = heroSlice.actions

export default heroSlice.reducer
