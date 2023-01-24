import classNames from 'classnames'
import './Modal.scss'

const ModalButton = ({
  children,
  onCloseFn,
  className,
}: {
  children: string
  onCloseFn: () => void
  className: string
}) => {
  return (
    <div
      className={'modalButton ' + className}
      onClick={() => {
        onCloseFn()
      }}>
      {children}
    </div>
  )
}

export default ModalButton
