export enum StatType {
  COINS = 'coins',
  STEPS = 'steps',
  KILLS = 'kills',
  TIME = 'time',
}

export default interface GameStatProps {
  type: StatType
  quantity: number
}
