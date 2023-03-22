import { FC, useEffect, useState } from 'react'
import GameUIModal, { GameUIModalProps } from '@game/components/GameUIModal'
import GameUIButton from '@game/components/GameUIButton'
import useGameModalClose from '@hooks/useGameModalClose'
import RestartButton from '@game/components/RestartButton'
import QuitButton from '@game/components/QuitButton'
import { toggleFullscreen } from '@utils/game'

const MenuModal: FC<GameUIModalProps> = ({ close, ...props }) => {
  const closeModal = useGameModalClose(close)
  const [fullscreenMode, setFullscreenMode] = useState(false)

  useEffect(() => {
    setFullscreenMode(!!document.fullscreenElement)
  }, [])

  const toggleFullscreenHandler = () => {
    const toggle = toggleFullscreen(!fullscreenMode)
    if (toggle !== null) {
      setFullscreenMode(toggle)
    }
  }
  return (
    <GameUIModal close={closeModal} title="Game menu (P)" {...props}>
      <div className="map-scene-ui__game-menu">
        <GameUIButton onClick={toggleFullscreenHandler}>
          Fullscreen {fullscreenMode ? 'off' : 'on'} (F)
        </GameUIButton>
        <RestartButton onClick={closeModal} showShortcut={true} />
        <QuitButton onClick={closeModal} showShortcut={true} />
      </div>
    </GameUIModal>
  )
}
export default MenuModal
