import { useDispatch } from 'react-redux'
import { finishLevel } from '@store/slices/game'
import GameUI from '@game/components/GameUI'
import LiveGameCanvas from '@game/components/LiveGameCanvas'
import StaticGameCanvas from '@game/components/StaticGameConvas'
import { width, height } from '@utils/winsize'
import './MapSceneNext.scss'

function MapSceneNext({ onExit }: SceneProps) {
  const dispatch = useDispatch()
  const onGameFinish = () => {
    dispatch(finishLevel({ time: 0 }))
  }

  return (
    <div className="map-scene">
      <div className="map-scene__layer game-ui-wrapper">
        <GameUI className="map-scene__buttons">
          {/* TODO buttons below is mock, it`s need to work out in GameUI */}
          <a className="mx-auto minecrafted" onClick={onGameFinish}>
            finish game
          </a>
          <a className="mx-auto minecrafted" onClick={onExit}>
            exit
          </a>
        </GameUI>
      </div>
      {/* <div className="map-scene__layer front-effects-canvas-wrapper">
        <LiveGameCanvas width={width} height={height} />
      </div> */}
      <div className="map-scene__layer live-game-canvas-wrapper">
        <LiveGameCanvas width={width} height={height} />
      </div>
      {/* <div className="map-scene__layer back-effects-canvas-wrapper">
        <LiveGameCanvas width={width} height={height} />
      </div> */}
      <div className="map-scene__layer static-game-canvas-wrapper">
        <StaticGameCanvas width={width} height={height} />
      </div>
    </div>
  )
}
export default MapSceneNext
