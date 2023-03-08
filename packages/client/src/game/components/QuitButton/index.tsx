import { FC } from 'react'
import GameUIButton, { GameUIButtonProps } from '@game/components/GameUIButton'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { exitGame } from '@store/slices/game'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@constants/routes'

export type QuitButtonProps = GameUIButtonProps & {
  onClick?: () => void
}
export const QuitButton: FC<QuitButtonProps> = ({
  onClick: onQuit,
  ...props
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <GameUIButton
      onClick={() => {
        onQuit?.()
        dispatch(exitGame())
        navigate(ROUTES.LEADERBOARD)
      }}
      {...props}>
      Exit
    </GameUIButton>
  )
}
export default QuitButton
