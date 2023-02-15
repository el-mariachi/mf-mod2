import { FC } from 'react'
import ModalButton from './ModalButton'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { exitGame } from '@store/slices/game'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@constants/routes'

type QuitButtonProps = {
  onCloseFn: () => void
}

export const QuitButton: FC<QuitButtonProps> = ({ onCloseFn }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <ModalButton
      className="w-50"
      onCloseFn={() => {
        onCloseFn()
        dispatch(exitGame())
        navigate(ROUTES.LEADERBOARD)
      }}
      children="Quit (q)"
    />
  )
}
