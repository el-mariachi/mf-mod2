import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import './GameUIButton.scss'

export type GameUIButtonProps = HTMLAttributes<HTMLButtonElement>
const GameUIButton: FC<GameUIButtonProps> = ({
  onClick,
  className: cls,
  children: content,
  ...attrs
}) => {
  return (
    <button
      className={classNames('game-ui-button', cls)}
      onClick={onClick}
      {...attrs}>
      <span className="game-ui-button__wrapper">
        <span className="game-ui-button__content">{content}</span>
      </span>
    </button>
  )
}

export default GameUIButton
