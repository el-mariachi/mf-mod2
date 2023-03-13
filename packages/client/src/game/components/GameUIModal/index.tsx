import { FC, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import './GameUIModal.scss'

export type GameUIModalFullProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean
  close?: () => void
  title: string
}
export type GameUIModalProps = Omit<GameUIModalFullProps, 'title' | 'children'>

const GameUIModal: FC<GameUIModalFullProps> = ({
  active = true,
  close: onClose,
  title,
  className: cls,
  children: content,
  ...attrs
}) => {
  const [isActive, setIsActive] = useState(active)

  const closeModal = () => {
    onClose?.()
    setIsActive(false)
  }
  return (
    <div
      className={classNames(
        'game-ui-modal',
        { 'game-ui-modal_active': isActive },
        cls
      )}
      onClick={closeModal}
      {...attrs}>
      <div className="game-ui-modal__box" onClick={e => e.stopPropagation()}>
        <div className="game-ui-modal__boxWrapper">
          <div className="game-ui-modal__header">
            <span className="game-ui-modal__caption">{title}</span>
            <button
              className="game-ui-modal__close-btn"
              title="Close window"
              onClick={closeModal}>
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
