import { HeroClass } from '@type/game'

type HeroResources = {
  hits: number
}
type ResourcePresets = {
  [k in HeroClass]: HeroResources
}

export const heroPresets: ResourcePresets = {
  [HeroClass.knight]: {
    hits: 32,
  },
  [HeroClass.archer]: {
    hits: 32,
  },
  [HeroClass.wizard]: {
    hits: 32,
  },
}

export const defaultMaxValues: HeroResources = {
  hits: 256,
}

export const defaultMaxHealth = 100

export type HeroSlice = {
  heroClass: HeroClass
  health: number
  maxHealth: number
  resources: HeroResources
  resourceMaxValues: HeroResources
}

export const heroInitialState: HeroSlice = {
  heroClass: HeroClass.knight,
  health: defaultMaxHealth,
  maxHealth: defaultMaxHealth,
  resources: heroPresets[HeroClass.knight],
  resourceMaxValues: defaultMaxValues,
}
