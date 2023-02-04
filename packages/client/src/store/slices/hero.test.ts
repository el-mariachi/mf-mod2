import reducer, { updateHealthByAmount, updateResourceByAmount } from './hero'
import { HeroClass, defaultMaxValues, heroPresets } from '@constants/hero'

const defaultHero = {
  heroClass: HeroClass.L3X3III,
  health: 100,
  resources: heroPresets[HeroClass.L3X3III],
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
    expect(reducer(defaultHero, updateHealthByAmount(-42))).toEqual({
      ...defaultHero,
      health: 58,
    })
  })
  it('should not set health above max value', () => {
    expect(reducer(defaultHero, updateHealthByAmount(120))).toEqual({
      ...defaultHero,
      health: 100,
    })
  })
})
