import { FC } from 'react'
import SecondsToHMS from '@game/utils/secondsFormat'
import coinsIcon from '@images/coin_icn.png'
import stepsIcon from '@images/steps_icn.png'
import deathIcon from '@images/death_icn.png'
import clockIcon from '@images/clock_icn.png'

export enum GameStatType {
  COINS = 'coins',
  STEPS = 'steps',
  KILLS = 'kills',
  TIME = 'time',
}
export interface GameStatItemProps {
  type: GameStatType
  quantity: number
}
const GameStatItem: FC<GameStatItemProps> = ({ type, quantity }) => {
  const value: string | number =
    type == GameStatType.TIME ? SecondsToHMS(quantity) : quantity

  const iconMap = {
    [GameStatType.COINS]: coinsIcon,
    [GameStatType.STEPS]: stepsIcon,
    [GameStatType.KILLS]: deathIcon,
    [GameStatType.TIME]: clockIcon,
  }

  return (
    <li>
      <img src={iconMap[type]} />
      {value}
    </li>
  )
}
export default GameStatItem
