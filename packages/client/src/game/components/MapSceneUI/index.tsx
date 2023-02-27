import { FC, useState } from 'react'
import classNames from 'classnames'
import MapController from '@game/controllers/MapController'
import GameUIButton from '@game/components/GameUIButton'
import GameUIPanel from '@game/components/GameUIPanel'
import HealthBar from './HealthBar'
import MenuModal from './MenuModal'
import CharInfoModal from './CharInfoModal'
import InventoryModal from './InventoryModal'
import LevelStats from './LevelStats'
import PauseState from './PauseState'
import InteractionPanel from './InteractionPanel'
import joystickIcn from '@images/joystick_icn.png'
import scrollIcn from '@images/scroll_icn.png'
import chestIcn from '@images/chest_icn.png'
import heroThumb from '@images/knight-head.png'
import './MapSceneUI.scss'

enum ModalType {
  menu,
  info,
  inventory,
}
export type MapSceneUIProps = {
  map: MapController['cells']
}
const MapSceneUI: FC<MapSceneUIProps> = ({ map }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const closeModal = () => setModalType(null)

  let modal = null
  switch (modalType) {
    case ModalType.menu:
      modal = <MenuModal close={closeModal} />
      break

    case ModalType.info:
      modal = <CharInfoModal hero={map?.hero} close={closeModal} />
      break

    case ModalType.inventory:
      modal = <InventoryModal hero={map?.hero} close={closeModal} />
      break
  }

  return (
    <div className="map-scene-ui">
      {modal}
      <PauseState className="map-scene-ui__pause-state" />
      <LevelStats className="map-scene-ui__game-stats" />
      <InteractionPanel className="map-scene-ui__interaction-panel" />
      <GameUIPanel className="map-scene-ui__game-panel">
        <div className="map-scene-ui__game-panel-wrapper">
          <div className="map-scene-ui__char-info">
            {/* TODO hero outlook n skill level here */}
            <img src={heroThumb} />
            <div className="map-scene-ui__char-level">1</div>
          </div>
          <HealthBar />
          <div className="map-scene-ui__buttons">
            <GameUIButton
              className={classNames({
                'game-ui-button_active': modalType == ModalType.menu,
              })}
              onClick={() =>
                setModalType(
                  modalType != ModalType.menu ? ModalType.menu : null
                )
              }>
              <img src={joystickIcn} />
            </GameUIButton>

            <GameUIButton
              className={classNames({
                'game-ui-button_active': modalType == ModalType.info,
              })}
              onClick={() =>
                setModalType(
                  modalType != ModalType.info ? ModalType.info : null
                )
              }>
              <img src={scrollIcn} />
            </GameUIButton>

            <GameUIButton
              className={classNames({
                'game-ui-button_active': modalType == ModalType.inventory,
              })}
              onClick={() =>
                setModalType(
                  modalType != ModalType.inventory ? ModalType.inventory : null
                )
              }>
              <img src={chestIcn} />
            </GameUIButton>
          </div>
        </div>
      </GameUIPanel>
    </div>
  )
}
export default MapSceneUI
