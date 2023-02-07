export enum HeroClass {
  L3X3III = 'L3X3III',
  GINEFF = 'GINEFF',
  TAURENGOLD = 'TAURENGOLD',
  NEON_KONCH = 'NEON_KONCH',
  MITSON = 'MITSON',
}

type HeroResources = {
  hits: number
}
type ResourcePresets = {
  [k in HeroClass]: HeroResources
}

export const heroPresets: ResourcePresets = {
  [HeroClass.L3X3III]: {
    hits: 32,
  },
  [HeroClass.GINEFF]: {
    hits: 32,
  },
  [HeroClass.TAURENGOLD]: {
    hits: 32,
  },
  [HeroClass.NEON_KONCH]: {
    hits: 32,
  },
  [HeroClass.MITSON]: {
    hits: 32,
  },
}

export const defaultMaxValues: HeroResources = {
  hits: 256,
}

export const defaultMaxHealth = 100
