// import {store} from '@store/index'
import reducer, { setClass, PlayerClass, injure, heal } from './player'

const defaultPlayer = {
  playerClass: PlayerClass.L3X3III,
  props: {
    skill: 32,
    hits: 32,
    strength: 128,
    armor: 64,
  },
  health: 100,
}
const gineffClassProps = {
  skill: 32,
  hits: 64,
  strength: 128,
  armor: 32,
}

describe('Testing player slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(defaultPlayer)
  })
  it('should change player class', () => {
    expect(reducer(defaultPlayer, setClass(PlayerClass.GINEFF))).toEqual({
      playerClass: PlayerClass.GINEFF,
      props: gineffClassProps,
      health: 100,
    })
  })
  it('should reduce health by amount', () => {
    expect(reducer(defaultPlayer, injure(25)).health).toBe(75)
  })
  it('should reduce health but not below zero', () => {
    expect(reducer(defaultPlayer, injure(125)).health).toBe(0)
  })
  it('should not set health above 100', () => {
    expect(reducer(defaultPlayer, heal(125)).health).toBe(100)
  })
})
