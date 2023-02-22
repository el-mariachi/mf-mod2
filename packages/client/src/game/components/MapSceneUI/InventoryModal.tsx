import { FC } from 'react'
import GameUIModal, { GameUIModalProps } from '@game/components/GameUIModal'
import useGameModalClose from '@hooks/useGameModalClose'

const InventoryModal: FC<GameUIModalProps> = ({ close, ...props }) => {
  const closeModal = useGameModalClose(close)

  return (
    <GameUIModal close={closeModal} title="Inventory" {...props}>
      {/* TODO make page for inventory */}
      <div className="minecrafted">nothing here yet...</div>
    </GameUIModal>
  )
}
export default InventoryModal
