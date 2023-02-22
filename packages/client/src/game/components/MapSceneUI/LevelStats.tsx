import { FC, HTMLAttributes } from 'react'
import { GameStatType } from '@constants/game'
import { useAppSelector } from '@hooks/redux_typed_hooks'
import { levelStats, selectLevelScore } from '@store/selectors'
import SecondsToHMS from '@game/utils/secondsFormat'
import coinsIcon from '@images/coin_icn.png'
import stepsIcon from '@images/steps_icn.png'
import deathIcon from '@images/death_icn.png'
import clockIcon from '@images/clock_icn.png'

export type LevelStatItemProps = {
  type: GameStatType
  quantity: number
}
const iconMap = {
  [GameStatType.COINS]: coinsIcon,
  [GameStatType.STEPS]: stepsIcon,
  [GameStatType.KILLS]: deathIcon,
  [GameStatType.TIME]: clockIcon,
}
export const LevelStatItem: FC<LevelStatItemProps> = ({ type, quantity }) => {
  const value: string | number =
    type == GameStatType.TIME ? SecondsToHMS(quantity) : quantity

  return (
    <li>
      <img src={iconMap[type]} />
      {value}
    </li>
  )
}

export type LevelStatsProps = HTMLAttributes<HTMLDivElement> & {}
const LevelStats: FC<LevelStatsProps> = attrs => {
  const score = useAppSelector(selectLevelScore)
  // const { gameTotals } = useAppSelector(selectGameTotals)
  // const { killCount, coins, steps, time } = gameTotals
  const { killCount, coins, time, steps } = useAppSelector(levelStats)

  return (
    <div {...attrs}>
      <ul>
        <LevelStatItem type={GameStatType.TIME} quantity={time} />
        <LevelStatItem type={GameStatType.STEPS} quantity={steps} />
      </ul>
      <div>{score}</div>
      <ul>
        <LevelStatItem type={GameStatType.KILLS} quantity={killCount} />
        <LevelStatItem type={GameStatType.COINS} quantity={coins} />
      </ul>
    </div>
  )
}
export default LevelStats
