import { FC, HTMLAttributes } from 'react'
import { COLOR_ALMOST_WHITE } from '@constants/ui'
import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectPaused } from '@store/selectors'
import Icon from '@components/Icon'

export type PauseStateProps = HTMLAttributes<HTMLDivElement>
const PauseState: FC<PauseStateProps> = attrs => {
  const paused = useAppSelector(selectPaused)
  return paused ? (
    <div {...attrs}>
      <Icon iconName="PauseBtn" color={COLOR_ALMOST_WHITE} size={26} /> paused
    </div>
  ) : null
}
export default PauseState
