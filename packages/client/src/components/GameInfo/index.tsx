import { useState } from 'react'
import './GameStats.scss'
import GameStatItem from './GameStat/StatItem'
import { store } from '@store/index'
import HealthBar from './HealthBar/HealtBar'
import Modal from './Modal/Modal'
import ModalButton from './Modal/ModalButton'

function GameInfo() {
  const children1 = (
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

  const children2 = (
    // TODO replace static values with data from store
    <div className="d-flex">
      <img src="src/assets/images/hero.png" />
      <div className="modalStats">
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

  const children3 = (
    // TODO make page for inventory
    <div></div>
  )

  const title1 = 'Game menu'
  const title2 = 'Character info'
  const title3 = 'Inventory'

  const childrenArr = [children1, children2, children3]
  const titleArr = [title1, title2, title3]

  const [modalActive, setModalActive] = useState(false)

  const [modalChildren, setModalChildren] = useState(childrenArr[0])
  const [modalTitle, setModalTitle] = useState(titleArr[0])

  const [isActive1, setActive1] = useState(false)
  const [isActive2, setActive2] = useState(false)
  const [isActive3, setActive3] = useState(false)

  function closeModal() {
    setModalActive(false)
    setActive1(false)
    setActive2(false)
    setActive3(false)
  }

  return (
    <>
      <div className="gameStats">
        <ul>
          <GameStatItem
            type="coins"
            quantity={store.getState().game.levelStats.coins}></GameStatItem>
          <GameStatItem
            type="steps"
            quantity={store.getState().game.levelStats.steps}></GameStatItem>
        </ul>
        <div>{store.getState().game.levelStats.levelNum}</div>
        <ul>
          <GameStatItem
            type="kills"
            quantity={
              store.getState().game.levelStats.killCount
            }></GameStatItem>
          <GameStatItem
            type="time"
            quantity={store.getState().game.levelStats.time}></GameStatItem>
        </ul>
      </div>

      <div className="gameMenu">
        <div className="charInfo">
          <img src="src/assets/images/hero-head.png" />
          <div className="level">1</div>
        </div>
        <HealthBar health={67} />
        <div className="buttons">
          <div
            className={isActive1 ? 'active' : ''}
            onClick={() => {
              setActive2(false)
              setActive3(false)
              if (isActive1) {
                setActive1(false)
                setModalActive(false)
              } else {
                setActive1(true)
                setModalActive(true)
              }
              setModalChildren(childrenArr[0])
              setModalTitle(titleArr[0])
            }}>
            <img src="src/assets/images/joystick_icn.png" />
          </div>

          <div
            className={isActive2 ? 'active' : ''}
            onClick={() => {
              setActive1(false)
              setActive3(false)
              if (isActive2) {
                setActive2(false)
                setModalActive(false)
              } else {
                setActive2(true)
                setModalActive(true)
              }
              setModalChildren(childrenArr[1])
              setModalTitle(titleArr[1])
            }}>
            <img src="src/assets/images/scroll_icn.png" />
          </div>

          <div
            className={isActive3 ? 'active' : ''}
            onClick={() => {
              setActive1(false)
              setActive2(false)
              if (isActive3) {
                setActive3(false)
                setModalActive(false)
              } else {
                setActive3(true)
                setModalActive(true)
              }
              setModalChildren(childrenArr[2])
              setModalTitle(titleArr[2])
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
