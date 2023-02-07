import { useState, FC } from 'react'
import GameStatProps from './GameStatProps'
import SecondsToHMS from '@utils/secondsFormat'
import { StatType } from './GameStatProps'
import coinsIcon from '@images/coin_icn.png'
import stepsIcon from '@images/steps_icn.png'
import deathIcon from '@images/death_icn.png'
import clockIcon from '@images/clock_icn.png'

const GameStatItem: FC<GameStatProps> = ({ type, quantity }: GameStatProps) => {
  const value: string | number =
    type == StatType.TIME ? SecondsToHMS(quantity) : quantity

  const iconMap = {
    [StatType.COINS]: coinsIcon,
    [StatType.STEPS]: stepsIcon,
    [StatType.KILLS]: deathIcon,
    [StatType.TIME]: clockIcon,
  }

  return (
    <li>
      <img src={iconMap[type]} />
      {value}
    </li>
  )
}

export default GameStatItem
