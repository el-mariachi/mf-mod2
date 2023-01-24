import React, { ReactNode } from 'react'
import './Modal.scss'

const Modal = ({
  active,
  children,
  close,
  title,
}: {
  active: boolean
  children: ReactNode
  close: () => void
  title: string
}) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        close()
      }}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <div className="header">
          {title}
          <button
            className="closeButton"
            onClick={() => {
              close()
            }}>
            X
          </button>
        </div>
        <div className="childrenContent">{children}</div>
      </div>
    </div>
  )
}

export default Modal
