import { useEffect, useState, useRef } from 'react'
import * as Types from '@type/game'
import { useAppSelector } from 'hooks/redux_typed_hooks'
import MapController from '@game/controllers/MapController'
import { createLayers, LayerRecord } from '@game/controllers/LayerController'
import { useGameController } from '@hooks/useGameController'
import LifeController from '@game/controllers/LifeController'
import MapSceneUI from '@game/components/MapSceneUI'
import { selectPaused } from '@store/selectors'
import { width, height } from '@utils/winsize'
import './MapScene.scss'

function MapScene() {
  const [gameAction, setGameAction] = useState(
    [] as unknown as Types.GameAction
  )
  const [layers, setLayers]: [
    LayerRecord,
    React.Dispatch<React.SetStateAction<LayerRecord>>
  ] = useState({})
  const layersRef = useRef<HTMLDivElement>(null)
  const lifeRef = useRef({} as LifeController)
  const mapRef = useRef({} as MapController)
  const paused = useAppSelector(selectPaused)

  /** создаем три слоя canvas для разных типов игровых объектов*/
  useEffect(() => {
    const removeKeyboardListener = useGameController(setGameAction)
    const layers: LayerRecord = createLayers(
      ['static', 'active', 'effetcs'],
      [width, height]
    )
    setLayers(layers)

    return removeKeyboardListener
  }, [])

  useEffect(() => {
    if (layersRef.current) {
      Object.entries(layers).forEach(([, layer]) => {
        if (layersRef.current) {
          layersRef.current.append(layer.canvas)
        }
      })
    }
    if (Object.keys(layers).length !== 0) {
      mapRef.current = new MapController({
        layers,
        level: 1,
        size: [width, height],
      })
      lifeRef.current = new LifeController(mapRef.current)
    }
  }, [layers])

  useEffect(() => {
    if (gameAction) {
      const [gameEvent]: Types.GameAction = gameAction
      if (
        lifeRef.current &&
        lifeRef.current instanceof LifeController &&
        Types.MoveGameEvents.includes(gameEvent)
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        lifeRef.current.turn(Types.MapGameEvents2Direction[gameEvent])
      }
    }
  }, [gameAction])

  useEffect(() => {
    if (lifeRef.current && lifeRef.current instanceof LifeController) {
      lifeRef.current.toggle(!paused)
      if (paused) {
        setGameAction([Types.GameEvent.None, 0])
      }
    }
  }, [paused])

  /** canvas добавляются при создания слоя Layer. Сделано для того, чтобы не
      обращаться к каждому слою через ref */
  return (
    <>
      <MapSceneUI map={mapRef.current.cells} />
      <div ref={layersRef} className="map-scene__layers"></div>
    </>
  )
}

export default MapScene
