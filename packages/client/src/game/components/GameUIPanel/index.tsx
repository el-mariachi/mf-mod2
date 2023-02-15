import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import './GameUIPanel.scss'

type GameUIPanelProps = HTMLAttributes<HTMLDivElement>
const GameUIPanel: FC<GameUIPanelProps> = ({
  className: cls,
  children: content,
  ...attrs
}) => {
  return (
    <div className={classNames('game-ui-panel', cls)} {...attrs}>
      <div className="game-ui-panel__wrapper">
        <div className="game-ui-panel__content">{content}</div>
      </div>
    </div>
  )
}

export default GameUIPanel
