import { FC } from 'react'
import GameUIButton, { GameUIButtonProps } from '@game/components/GameUIButton'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { restartLevel } from '@store/slices/game'

export type RestartButtonProps = GameUIButtonProps & {
  onClick: () => void
}
export const RestartButton: FC<RestartButtonProps> = ({
  onClick: restart,
  ...props
}) => {
  const dispatch = useAppDispatch()
  return (
    <GameUIButton
      onClick={() => {
        dispatch(restartLevel())
        restart()
      }}
      {...props}>
      Restart level (l)
    </GameUIButton>
  )
}
