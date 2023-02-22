import { useEffect, useState, useRef } from 'react'
import * as Types from '@game/core/types'
import { useAppSelector } from 'hooks/redux_typed_hooks'
import MapController from '@game/Controllers/MapController'
import { createLayers, LayerRecord } from '@game/Controllers/LayerController'
import { useGameController, GameActionType } from '@hooks/useGameController'
import LifeController from '@game/Controllers/LifeController'
import MapSceneUI from '@game/components/MapSceneUI'
import { selectPaused } from '@store/selectors'
import hero from '@sprites/hero.png'
import dungeonTileset from '@sprites/tileset.png'
import skeleton from '@sprites/skeleton.png'
import { width, height } from '@utils/winsize'
import './MapScene.scss'

const images = [hero, dungeonTileset, skeleton]

function MapScene({ onExit }: SceneProps) {
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
    // TODO перенести в LoadScene после того как определится порядок загрузки сцен
    const promises = images.map(src => {
      return new Promise(res => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          res(null)
        }
      })
    })

    Promise.all(promises).then(() => {
      const layers: LayerRecord = createLayers(
        ['static', 'active', 'effetcs'],
        [width, height]
      )
      setLayers(layers)
    })

    return removeKeyboardListener
  }, [])

  useEffect(() => {
    if (layersRef.current) {
      Object.entries(layers).forEach(([_, layer]) => {
        layersRef.current!.append(layer.canvas)
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
      const [gameEvent, _]: Types.GameAction = gameAction
      if (Types.MoveGameEvents.includes(gameEvent)) {
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
      <MapSceneUI />
      <div ref={layersRef} className="map-scene__layers"></div>
    </>
  )
}

export default MapScene
