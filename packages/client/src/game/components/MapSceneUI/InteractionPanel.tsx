import { FC } from 'react'
import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectPaused, selectInteraction } from '@store/selectors'
import GameUIPanel, { GameUIPanelProps } from '@game/components/GameUIPanel'
import {
  GameEntourageName,
  GameInteractionType,
  GameItemName,
} from '@type/game'

type InteractionPanelProps = Omit<GameUIPanelProps, 'children'> & {}
const InteractionPanel: FC<InteractionPanelProps> = props => {
  const interaction = useAppSelector(selectInteraction)
  const { type, object, result } = interaction
  const paused = useAppSelector(selectPaused)
  const show = GameInteractionType.none != type && !paused

  let message = ''
  switch (type) {
    case GameInteractionType.open:
      if (GameEntourageName.gate == object && !result)
        message = 'The door is locked'
      break
    // ...
  }

  return show && message ? (
    <GameUIPanel {...props}>{message}</GameUIPanel>
  ) : null
}

export default InteractionPanel
