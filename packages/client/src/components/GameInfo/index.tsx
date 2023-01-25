import { useState } from 'react'
import './GameStats.scss'
import GameStatItem from './GameStat/StatItem'
import { store } from '@store/index'
import HealthBar from './HealthBar/HealtBar'
import Modal from './Modal/Modal'
import ModalButton from './Modal/ModalButton'
import { StatType } from './GameStat/GameStatProps'

function GameInfo() {
  const childGameMenu = (
    <div>
      <ModalButton
        className=" w-50 mb-3"
        onCloseFn={() => {
          closeModal()
        }}
        children="Restart(r)"
      />
      <ModalButton
        className=" w-50"
        onCloseFn={() => {
          closeModal()
        }}
        children="Quit(q)"
      />
    </div>
  )

  const childCharInfo = (
    // TODO replace static values with data from store
    <div className="d-flex">
      <img src="src/assets/images/hero.png" />
      <div className="modal__stats">
        <h3>Nickname</h3>
        <ul>
          <li>
            Unit class: <span>knight</span>
          </li>
          <li>
            Skills level: <span>1</span>
          </li>
          <li>
            Attack damage: <span>9</span>
          </li>
          <li>
            Defence level: <span>16</span>
          </li>
        </ul>
        <div>
          <ModalButton
            onCloseFn={() => {
              closeModal()
            }}
            children="Close(x)"
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
  }

  return (
    <>
      <div className="cont__game-stats">
        <ul>
          <GameStatItem
            type={StatType.COINS}
            quantity={store.getState().game.levelStats.coins}></GameStatItem>
          <GameStatItem
            type={StatType.STEPS}
            quantity={store.getState().game.levelStats.steps}></GameStatItem>
        </ul>
        <div>{store.getState().game.levelStats.levelNum}</div>
        <ul>
          <GameStatItem
            type={StatType.KILLS}
            quantity={
              store.getState().game.levelStats.killCount
            }></GameStatItem>
          <GameStatItem
            type={StatType.TIME}
            quantity={store.getState().game.levelStats.time}></GameStatItem>
        </ul>
      </div>

      <div className="cont__game-menu">
        <div className="cont__char-info">
          <img src="src/assets/images/hero-head.png" />
          <div className="cont__char-level">1</div>
        </div>
        <HealthBar health={67} />
        <div className="cont__buttons">
          <div
            className={isActiveGameMenu ? 'button_active' : ''}
            onClick={() => {
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
