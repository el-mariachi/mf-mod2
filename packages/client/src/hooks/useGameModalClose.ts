import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { pauseGame, resumeGame } from '@store/slices/game'
import { useEffect } from 'react'

// TODO переименовать useGameModalClose

const useGameModalClose = (onClose?: () => void) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(pauseGame())
    return () => {
      dispatch(resumeGame())
    }
  }, [])

  return () => {
    onClose?.()
    dispatch(resumeGame())
  }
}
export default useGameModalClose
