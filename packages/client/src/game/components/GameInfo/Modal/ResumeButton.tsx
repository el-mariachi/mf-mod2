import { FC } from 'react'
import ModalButton from './ModalButton'

type ResumeButtonProps = {
  onCloseFn: () => void
}

export const ResumeButton: FC<ResumeButtonProps> = ({ onCloseFn }) => {
  return (
    <ModalButton
      className="w-50 mb-3"
      onCloseFn={onCloseFn}
      children="Resume (r)"
    />
  )
}
