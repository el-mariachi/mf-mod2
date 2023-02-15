import { FC } from 'react'
import GameUIButton, { GameUIButtonProps } from '@game/components/GameUIButton'

export const ResumeButton: FC<GameUIButtonProps> = ({ onClick, ...props }) => {
  return (
    <GameUIButton onClick={onClick} {...props}>
      Resume (r)
    </GameUIButton>
  )
}
