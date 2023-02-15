import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import './GameUIModal.scss'

type GameUIModalProps = HTMLAttributes<HTMLDivElement> & {
  active: boolean
  close: () => void
  title: string
}
const GameUIModal: FC<GameUIModalProps> = ({
  active,
  close,
  title,
  className: cls,
  children: content,
  ...attrs
}) => {
  return (
    <div
      className={classNames(
        'game-ui-modal',
        { 'game-ui-modal_active': active },
        cls
      )}
      onClick={() => {
        close()
      }}
      {...attrs}>
      <div className="game-ui-modal__box" onClick={e => e.stopPropagation()}>
        <div className="game-ui-modal__boxWrapper">
          <div className="game-ui-modal__header">
            <span className="game-ui-modal__caption">{title}</span>
            <button
              className="game-ui-modal__close-btn"
              title="Close window"
              onClick={() => {
                close()
              }}>
              close
            </button>
          </div>
          <div className="game-ui-modal__content">
            <div className="game-ui-modal__contentWrapper">{content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GameUIModal
