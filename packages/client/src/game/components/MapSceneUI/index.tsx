import { useState } from 'react'
import SCENES from '@constants/scenes'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import {
  selectGameScore,
  selectGameTotals,
  selectHero,
  selectUserData,
} from '@store/selectors'
import { pauseGame, resumeGame } from '@store/slices/game'
import { currentScene as selectCurrntScene } from '@store/selectors'
import GameUIModal from '@game/components/GameUIModal'
import GameUIButton from '@game/components/GameUIButton'
import GameUIPanel from '@game/components/GameUIPanel'
import GameStatItem, { GameStatType } from './GameStat'
import HealthBar from './HealthBar'
import { RestartButton } from './RestartButton'
import { ResumeButton } from './ResumeButton'
import { QuitButton } from './QuitButton'
import joystickIcn from '@images/joystick_icn.png'
import scrollIcn from '@images/scroll_icn.png'
import chestIcn from '@images/chest_icn.png'
import heroThumb from '@images/hero-head.png'
import heroImg from '@images/hero.png'
import './MapSceneUI.scss'

function MapSceneUI() {
  const dispatch = useAppDispatch()
  const { display_name } = useAppSelector(selectUserData)
  const { levelNum, gameTotals } = useAppSelector(selectGameTotals)
  const score = useAppSelector(selectGameScore)
  const { killCount, coins, steps, time } = gameTotals
  const { heroClass, resources } = useAppSelector(selectHero)
  const currentScene = useAppSelector(selectCurrntScene)
  const pauseOnMap = () => {
    if (currentScene === SCENES.MAP_SCENE) {
      dispatch(pauseGame())
    }
  }
  const childGameMenu = (
    <div className="map-scene-ui__game-menu">
      <ResumeButton onClick={closeModal} />
      <RestartButton onClick={closeModal} />
      <QuitButton onClick={closeModal} />
    </div>
  )

  const childCharInfo = (
    <div className="d-flex map-scene-ui__char-info">
      <img src={heroImg} />
      <div className="map-scene-ui__char-info-props">
        <h4 className="map-scene-ui__char-info-nick mb-3">{display_name}</h4>
        <ul className="mb-4">
          {/* TODO replace mock props with real ones when appropriate */}
          <li>
            Unit class: <span>knight</span>
          </li>
          <li>
            Unit level: <span>1</span>
          </li>
          <li>
            Attack damage: <span>{resources.hits}</span>
          </li>
          <li>
            Defence level: <span>16</span>
          </li>
          {/* TODO replace mock props with real ones when appropriate */}
        </ul>
        <div>
          <GameUIButton
            onClick={() => {
              closeModal()
            }}>
            Close (x)
          </GameUIButton>
        </div>
      </div>
    </div>
  )

  const childInv = (
    // TODO make page for inventory
    <div>nothing here yet...</div>
  )

  const titleGameMenu = 'Game menu'
  const titleCharInfo = 'Character info'
  const titleInv = 'Inventory'

  const [modalActive, setModalActive] = useState(false)

  const [modalChildren, setModalChildren] = useState(childGameMenu)
  const [modalTitle, setModalTitle] = useState(titleGameMenu)

  const [isActiveGameMenu, setActiveGameMenu] = useState(false)
  const [isActiveCharInfo, setActiveCharInfo] = useState(false)
  const [isActiveInv, setActiveInv] = useState(false)

  function closeModal() {
    setModalActive(false)
    setActiveGameMenu(false)
    setActiveCharInfo(false)
    setActiveInv(false)
    if (currentScene === SCENES.MAP_SCENE) {
      dispatch(resumeGame())
    }
  }

  return (
    <div className="map-scene-ui">
      <div className="map-scene-ui__game-stats">
        <ul>
          <GameStatItem type={GameStatType.COINS} quantity={coins} />
          <GameStatItem type={GameStatType.STEPS} quantity={steps} />
        </ul>
        <div>{score}</div>
        <ul>
          <GameStatItem type={GameStatType.KILLS} quantity={killCount} />
          <GameStatItem type={GameStatType.TIME} quantity={time} />
        </ul>
      </div>
      <GameUIPanel className="map-scene-ui__game-panel">
        <div className="map-scene-ui__game-panel-wrapper">
          <div className="map-scene-ui__char-info">
            <img src={heroThumb} />
            <div className="map-scene-ui__char-level">{levelNum}</div>
          </div>
          <HealthBar />
          <div className="map-scene-ui__buttons">
            <GameUIButton
              className={classNames({
                'game-ui-button_active': isActiveGameMenu,
              })}
              onClick={() => {
                pauseOnMap()
                setActiveCharInfo(false)
                setActiveInv(false)
                if (isActiveGameMenu) {
                  setActiveGameMenu(false)
                  setModalActive(false)
                } else {
                  setActiveGameMenu(true)
                  setModalActive(true)
                }
                setModalChildren(childGameMenu)
                setModalTitle(titleGameMenu)
              }}>
              <img src={joystickIcn} />
            </GameUIButton>

            <GameUIButton
              className={classNames({
                'game-ui-button_active': isActiveCharInfo,
              })}
              onClick={() => {
                pauseOnMap()
                setActiveGameMenu(false)
                setActiveInv(false)
                if (isActiveCharInfo) {
                  setActiveCharInfo(false)
                  setModalActive(false)
                } else {
                  setActiveCharInfo(true)
                  setModalActive(true)
                }
                setModalChildren(childCharInfo)
                setModalTitle(titleCharInfo)
              }}>
              <img src={scrollIcn} />
            </GameUIButton>

            <GameUIButton
              className={classNames({ 'game-ui-button_active': isActiveInv })}
              onClick={() => {
                pauseOnMap()
                setActiveGameMenu(false)
                setActiveCharInfo(false)
                if (isActiveInv) {
                  setActiveInv(false)
                  setModalActive(false)
                } else {
                  setActiveInv(true)
                  setModalActive(true)
                }
                setModalChildren(childInv)
                setModalTitle(titleInv)
              }}>
              <img src={chestIcn} />
            </GameUIButton>
          </div>
        </div>
      </GameUIPanel>

      <GameUIModal active={modalActive} close={closeModal} title={modalTitle}>
        {modalChildren}
      </GameUIModal>
    </div>
  )
}

export default MapSceneUI
