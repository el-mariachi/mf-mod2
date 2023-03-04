import reducer, { updateHealth, updateResourceByAmount } from './hero'
import {
  defaultMaxValues,
  heroPresets,
  defaultMaxHealth,
} from '@constants/hero'
import { HeroClass } from '@type/game'

const defaultHero = {
  heroClass: HeroClass.knight,
  health: 100,
  maxHealth: defaultMaxHealth,
  resources: heroPresets[HeroClass.knight],
  resourceMaxValues: defaultMaxValues,
}

describe('Testing player slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(defaultHero)
  })
  it('should update the skills with provided payload', () => {
    expect(reducer(defaultHero, updateResourceByAmount({ hits: 64 }))).toEqual({
      ...defaultHero,
      resources: {
        hits: 96,
      },
    })
  })
  it('should not set the skill above max value', () => {
    expect(reducer(defaultHero, updateResourceByAmount({ hits: 640 }))).toEqual(
      {
        ...defaultHero,
        resources: {
          hits: defaultMaxValues.hits,
        },
      }
    )
  })
  it('should update health with provided payload', () => {
    expect(reducer(defaultHero, updateHealth(-42))).toEqual({
      ...defaultHero,
      health: 58,
    })
  })
  it('should not set health above max value', () => {
    expect(reducer(defaultHero, updateHealth(120))).toEqual({
      ...defaultHero,
      health: 100,
    })
  })
})
