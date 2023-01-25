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
      className={'modal__button ' + className}
      onClick={() => {
        onCloseFn()
      }}>
      {children}
    </div>
  )
}

export default ModalButton
