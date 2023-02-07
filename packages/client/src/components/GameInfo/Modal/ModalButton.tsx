import { FC } from 'react'
import classNames from 'classnames'
import './Modal.scss'

type ModalButtonProps = {
  children: string
  onCloseFn: () => void
  className: string
}

const ModalButton: FC<ModalButtonProps> = ({
  children,
  onCloseFn,
  className,
}) => {
  return (
    <div className={classNames('modal__button', className)} onClick={onCloseFn}>
      {children}
    </div>
  )
}

export default ModalButton
