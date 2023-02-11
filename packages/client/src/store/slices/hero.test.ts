import reducer, {
  updateHealth,
  updateHealthByAmount,
  updateResourceByAmount,
} from './hero'
import {
  HeroClass,
  defaultMaxValues,
  heroPresets,
  defaultMaxHealth,
} from '@constants/hero'

const defaultHero = {
  heroClass: HeroClass.L3X3III,
  health: 100,
  maxHealth: defaultMaxHealth,
  resources: heroPresets[HeroClass.L3X3III],
  resourceMaxValues: defaultMaxValues,
}

const heroReducer = reducer(defaultHero)

describe('Testing player slice', () => {
  it('should return the initial state', () => {
    expect(heroReducer(undefined, { type: undefined })).toEqual(defaultHero)
  })
  it('should update the skills with provided payload', () => {
    expect(
      heroReducer(defaultHero, updateResourceByAmount({ hits: 64 }))
    ).toEqual({
      ...defaultHero,
      resources: {
        hits: 96,
      },
    })
  })
  it('should not set the skill above max value', () => {
    expect(
      heroReducer(defaultHero, updateResourceByAmount({ hits: 640 }))
    ).toEqual({
      ...defaultHero,
      resources: {
        hits: defaultMaxValues.hits,
      },
    })
  })
  it('should update health with provided payload', () => {
    expect(heroReducer(defaultHero, updateHealth(-42))).toEqual({
      ...defaultHero,
      health: 58,
    })
  })
  it('should not set health above max value', () => {
    expect(heroReducer(defaultHero, updateHealth(120))).toEqual({
      ...defaultHero,
      health: 100,
    })
  })
})
