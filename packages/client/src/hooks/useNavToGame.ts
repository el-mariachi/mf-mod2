import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { showStartScene } from '@store/slices/game'
import ROUTES from '@constants/routes'

export const useNavToGame = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return () => {
    dispatch(showStartScene())
    navigate(ROUTES.GAME)
  }
}
