import './Modal.scss'
import ModalProps from './ModalProps'

const Modal = ({ active, children, close, title }: ModalProps) => {
  return (
    <div
      className={active ? 'gameModalUI gameModalUI_active' : 'gameModalUI'}
      onClick={() => {
        close()
      }}>
      <div className="gameModalUI__content" onClick={e => e.stopPropagation()}>
        <div className="gameModalUI__header">
          {title}
          <button
            className="gameModalUI__close-btn"
            onClick={() => {
              close()
            }}>
            X
          </button>
        </div>
        <div className="gameModalUI__child-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
