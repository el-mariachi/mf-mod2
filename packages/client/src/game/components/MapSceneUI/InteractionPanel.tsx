import { FC } from 'react'
import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectPaused, selectInteraction } from '@store/selectors'
import GameUIPanel, { GameUIPanelProps } from '@game/components/GameUIPanel'
import {
  GameEntourageName,
  GameInteractionType,
  UnitResource,
} from '@type/game'
import { capitalize } from '@utils/index'

type InteractionPanelProps = Omit<GameUIPanelProps, 'children'> & {}
const InteractionPanel: FC<InteractionPanelProps> = props => {
  const interaction = useAppSelector(selectInteraction)
  const { type, object, result } = interaction
  const paused = useAppSelector(selectPaused)
  const show = GameInteractionType.none != type && !paused

  let caption = ''
  let message = ''
  switch (type) {
    case GameInteractionType.unlock:
      if (GameEntourageName.gate == object && !result)
        message = 'The door is locked'
      break
    case GameInteractionType.battle:
      if (object) {
        caption = capitalize(object)
      }
      if (result) {
        const { value = 0, max } = result as UnitResource
        if (max) {
          message = value ? `health: ${value} / ${max}` : 'is dead'
        }
      }
      break
    // ...
  }
  return show && message ? (
    <GameUIPanel {...props}>
      {caption ? (
        <h5 className="minecrafted minecrafted_bold">{caption}</h5>
      ) : null}
      {message || 'nothing happens'}
    </GameUIPanel>
  ) : null
}

export default InteractionPanel
