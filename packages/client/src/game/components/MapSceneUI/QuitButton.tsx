import { FC } from 'react'
import GameUIButton, { GameUIButtonProps } from '@game/components/GameUIButton'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { exitGame } from '@store/slices/game'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@constants/routes'
import { RequiredField } from '@game/core/types'

type QuitButtonProps = RequiredField<GameUIButtonProps, 'onClick'>

export const QuitButton: FC<QuitButtonProps> = ({
  onClick: onQuit,
  ...props
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <GameUIButton
      onClick={e => {
        onQuit(e)
        dispatch(exitGame())
        navigate(ROUTES.LEADERBOARD)
      }}
      {...props}>
      Quit (q)
    </GameUIButton>
  )
}
