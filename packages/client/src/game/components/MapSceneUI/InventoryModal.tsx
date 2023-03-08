import { FC } from 'react'
import { GameItemName, Hero } from '@type/game'
import GameUIModal, { GameUIModalProps } from '@game/components/GameUIModal'
import useGameModalClose from '@hooks/useGameModalClose'
import GameUIButton from '../GameUIButton'

export type InventoryModalProps = GameUIModalProps & {
  hero?: Hero
}
const InventoryModal: FC<InventoryModalProps> = ({ close, hero, ...props }) => {
  const closeModal = useGameModalClose(close)

  return (
    <GameUIModal close={closeModal} title="Inventory" {...props}>
      <div className="map-scene-ui__inventory">
        {hero ? (
          <ul className="mb-4">
            <li>
              Keys:{' '}
              <span>
                {hero.bag.filter(item => GameItemName.key == item.name).length}
              </span>
            </li>
          </ul>
        ) : null}
        <div className="text-center">
          <GameUIButton onClick={closeModal}>Close</GameUIButton>
        </div>
      </div>
    </GameUIModal>
  )
}
export default InventoryModal
