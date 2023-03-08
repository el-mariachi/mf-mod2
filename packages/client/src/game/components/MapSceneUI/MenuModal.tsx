import { FC } from 'react'
import GameUIModal, { GameUIModalProps } from '@game/components/GameUIModal'
import GameUIButton from '@game/components/GameUIButton'
import useGameModalClose from '@hooks/useGameModalClose'
import RestartButton from '../RestartButton'
import QuitButton from '../QuitButton'

const MenuModal: FC<GameUIModalProps> = ({ close, ...props }) => {
  const closeModal = useGameModalClose(close)

  return (
    <GameUIModal close={closeModal} title="Game menu" {...props}>
      <div className="map-scene-ui__game-menu">
        <GameUIButton onClick={closeModal}>Resume</GameUIButton>
        <RestartButton onClick={closeModal} />
        <QuitButton onClick={closeModal} />
      </div>
    </GameUIModal>
  )
}
export default MenuModal
