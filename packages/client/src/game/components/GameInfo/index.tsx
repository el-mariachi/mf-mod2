import { useState } from 'react'
import './GameStats.scss'
import GameStatItem from './GameStat/StatItem'
import HealthBar from './HealthBar/HealtBar'
import Modal from './Modal/Modal'
import ModalButton from './Modal/ModalButton'
import { StatType } from './GameStat/GameStatProps'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import {
  selectGameScore,
  selectGameTotals,
  selectHero,
  selectUserData,
} from '@store/selectors'
import { pauseGame, resumeGame } from '@store/slices/game'
import { RestartButton } from './Modal/RestartButton'
import { ResumeButton } from './Modal/ResumeButton'
import { QuitButton } from './Modal/QuitButton'
import { currentScene as selectCurrntScene } from '@store/selectors'
import SCENES from '@constants/scenes'

function GameInfo() {
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
    <>
      {currentScene === SCENES.MAP_SCENE ? (
        <>
          <ResumeButton onCloseFn={closeModal} />
          <RestartButton onCloseFn={closeModal} />
        </>
      ) : null}
      <QuitButton onCloseFn={closeModal} />
    </>
  )

  const childCharInfo = (
    <div className="d-flex">
      <img src="src/assets/images/hero.png" />
      <div className="modal__stats">
        <h3>{display_name}</h3>
        <ul>
          <li>
            Unit class: <span>{heroClass}</span>
          </li>
          {/* TODO replace mock props with real ones when appropriate */}
          <li>
            Skills level: <span>1</span>
          </li>
          <li>
            Attack damage: <span>{resources.hits}</span>
          </li>
          {/* TODO replace mock props with real ones when appropriate */}
          <li>
            Defence level: <span>16</span>
          </li>
        </ul>
        <div>
          <ModalButton
            onCloseFn={() => {
              closeModal()
            }}
            children="Close (x)"
            className=""
          />
        </div>
      </div>
    </div>
  )

  const childInv = (
    // TODO make page for inventory
    <div></div>
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
    <>
      <div className="cont__game-stats">
        <ul>
          <GameStatItem type={StatType.COINS} quantity={coins} />
          <GameStatItem type={StatType.STEPS} quantity={steps} />
        </ul>
        <div>{score}</div>
        <ul>
          <GameStatItem type={StatType.KILLS} quantity={killCount} />
          <GameStatItem type={StatType.TIME} quantity={time} />
        </ul>
      </div>

      <div className="cont__game-menu">
        <div className="cont__char-info">
          <img src="src/assets/images/hero-head.png" />
          <div className="cont__char-level">{levelNum}</div>
        </div>
        <HealthBar />
        <div className="cont__buttons">
          <div
            className={isActiveGameMenu ? 'button_active' : ''}
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
            <img src="src/assets/images/joystick_icn.png" />
          </div>

          <div
            className={isActiveCharInfo ? 'button_active' : ''}
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
            <img src="src/assets/images/scroll_icn.png" />
          </div>

          <div
            className={isActiveInv ? 'button_active' : ''}
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
            <img src="src/assets/images/chest_icn.png" />
          </div>
        </div>
      </div>

      <Modal
        active={modalActive}
        children={modalChildren}
        close={closeModal}
        title={modalTitle}
      />
    </>
  )
}

export default GameInfo
