import { useState } from 'react'
import GameStatProps from './GameStatProps'
import SecondsToHMS from '@utils/secondsFormat'

function GameStatItem({ type, quantity }: GameStatProps) {
  let srcOfIcon
  let value: string | number = quantity

  switch (type) {
    case 'coins':
      srcOfIcon = 'src/assets/images/coin_icn.png'
      break
    case 'steps':
      srcOfIcon = 'src/assets/images/steps_icn.png'
      break
    case 'kills':
      srcOfIcon = 'src/assets/images/death_icn.png'
      break
    case 'time':
      srcOfIcon = 'src/assets/images/clock_icn.png'
      value = SecondsToHMS(quantity)
      break
  }

  return (
    <li>
      <img src={srcOfIcon} />
      {value}
    </li>
  )
}

export default GameStatItem
