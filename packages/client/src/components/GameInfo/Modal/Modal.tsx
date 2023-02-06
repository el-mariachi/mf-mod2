import './Modal.scss'
import ModalProps from './ModalProps'

const Modal = ({ active, children, close, title }: ModalProps) => {
  return (
    <div
      className={active ? 'modal modal_active' : 'modal'}
      onClick={() => {
        close()
      }}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          {title}
          <button
            className="modal__close-btn"
            onClick={() => {
              close()
            }}>
            X
          </button>
        </div>
        <div className="modal__child-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
