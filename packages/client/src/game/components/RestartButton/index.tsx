import { FC } from 'react'
import GameUIButton, { GameUIButtonProps } from '@game/components/GameUIButton'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { restartLevel } from '@store/slices/game'

export type RestartButtonProps = GameUIButtonProps & {
  onClick?: () => void
  showShortcut?: boolean
}
export const RestartButton: FC<RestartButtonProps> = ({
  onClick: onRestart,
  showShortcut = false,
  ...props
}) => {
  const dispatch = useAppDispatch()
  return (
    <GameUIButton
      onClick={() => {
        onRestart?.()
        dispatch(restartLevel())
      }}
      {...props}>
      Restart level{showShortcut ? ' (R)' : ''}
    </GameUIButton>
  )
}
export default RestartButton
