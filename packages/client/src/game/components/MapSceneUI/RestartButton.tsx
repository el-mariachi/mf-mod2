import { FC } from 'react'
import GameUIButton, { GameUIButtonProps } from '@game/components/GameUIButton'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { restartLevel } from '@store/slices/game'
import { RequiredField } from '@game/core/types'

type RestartButtonProps = RequiredField<GameUIButtonProps, 'onClick'>
export const RestartButton: FC<RestartButtonProps> = ({
  onClick: onRestart,
  ...props
}) => {
  const dispatch = useAppDispatch()
  return (
    <GameUIButton
      onClick={e => {
        dispatch(restartLevel())
        onRestart(e)
      }}
      {...props}>
      Restart level (l)
    </GameUIButton>
  )
}
