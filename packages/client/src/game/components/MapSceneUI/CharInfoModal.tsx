import { FC } from 'react'
import { Hero } from '@type/game'
import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectUserData } from '@store/selectors'
import useGameModalClose from '@hooks/useGameModalClose'
import GameUIModal, { GameUIModalProps } from '@game/components/GameUIModal'
import GameUIButton from '@game/components/GameUIButton'
import heroImg from '@images/knight.png'

export type CharInfoModalProps = GameUIModalProps & {
  hero?: Hero
}
const CharInfoModal: FC<CharInfoModalProps> = ({ close, hero, ...props }) => {
  const closeModal = useGameModalClose(close)
  const { display_name } = useAppSelector(selectUserData)

  return (
    <GameUIModal close={closeModal} title="Character info" {...props}>
      <div className="d-flex map-scene-ui__char-info">
        <img src={heroImg} />
        <div className="map-scene-ui__char-info-props">
          <h4 className="map-scene-ui__char-info-nick mb-3">{display_name}</h4>
          {hero ? (
            <ul className="mb-4">
              <li>
                Unit class: <span>{hero.heroClass}</span>
              </li>
              <li>
                Unit level: <span>{hero.level}</span>
              </li>
              <li>
                Attack:{' '}
                <span>
                  {hero.strength} ({hero?.criticalAttackChance * 100}/
                  {hero?.criticalAttackLevel * 100})
                </span>
              </li>
              <li>
                Defence:{' '}
                <span>
                  {hero.stamina} ({hero?.successDefenceChance * 100}/
                  {hero?.successDefenceLevel * 100})
                </span>
              </li>
            </ul>
          ) : null}
          <div>
            <GameUIButton onClick={closeModal}>Close</GameUIButton>
          </div>
        </div>
      </div>
    </GameUIModal>
  )
}
export default CharInfoModal
