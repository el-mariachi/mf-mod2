import { FC } from 'react'
import ModalButton from './ModalButton'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { restartLevel } from '@store/slices/game'

type RestartButtonProps = {
  onCloseFn: () => void
}

export const RestartButton: FC<RestartButtonProps> = ({ onCloseFn }) => {
  const dispatch = useAppDispatch()
  return (
    <ModalButton
      className="w-50 mb-3"
      onCloseFn={() => {
        dispatch(restartLevel())
        onCloseFn()
      }}
      children="Restart level (l)"
    />
  )
}
