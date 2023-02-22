import { FC } from 'react'
import GameUIModal, { GameUIModalProps } from '@game/components/GameUIModal'
import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectHero, selectUserData } from '@store/selectors'
import useGameModalClose from '@hooks/useGameModalClose'
import GameUIButton from '../GameUIButton'
import heroImg from '@images/hero.png'

const CharInfoModal: FC<GameUIModalProps> = ({ close, ...props }) => {
  const closeModal = useGameModalClose(close)
  const { display_name } = useAppSelector(selectUserData)
  const { resources } = useAppSelector(selectHero)

  return (
    <GameUIModal close={closeModal} title="Character info" {...props}>
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
          </ul>
          <div>
            <GameUIButton onClick={closeModal}>Close</GameUIButton>
          </div>
        </div>
      </div>
    </GameUIModal>
  )
}
export default CharInfoModal
