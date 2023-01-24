
import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import './GameUI.scss'

export type GameUIProps = HTMLAttributes<HTMLElement> & {
  // ... 
}
const GameUI: FC<GameUIProps> = ({
  children: content,
  className: cls,
  ...attrs
}) => { 
  
  // ... 

  return <div className={classNames(cls, 'game-ui')} {...attrs}>{content}</div>
}

export default GameUI
