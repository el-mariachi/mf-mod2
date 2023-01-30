import { useEffect, useState, useRef } from 'react'
import { width, height } from '@utils/winsize'
import './MapScene.css'
import {
  useGameController,
  GameActionType,
  GameEvent,
} from '@hooks/useGameController'
import MapController from '@game/Controllers/MapController'
import Layer from '@game/Controllers/Layerontroller'

function createLayers(layerNames: string[]): Layer[] {
  return layerNames.map((name, i) => {
    return new Layer({ name, zindex: i.toString(), width, height })
  })
}

function MapScene({ onExit }: SceneProps) {
  const gameAction: GameActionType = useGameController()
  const [layers, setLayers]: [
    Layer[],
    React.Dispatch<React.SetStateAction<Layer[]>>
  ] = useState([] as Layer[])
  const turnRef = useRef()

  const layersRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef({} as MapController)

  useEffect(() => {
    setLayers(createLayers(['static', 'active', 'effetcs']))

    //const statistic = new StatisticController()
    //turnRef.current = new TurnController(map, statistic)
  }, [])

  useEffect(() => {
    if (layersRef.current) {
      layers.forEach(el => {
        layersRef.current!.append(el.canvas)
      })

      mapRef.current = new MapController({ layers, level: 1, width, height })
    }
  }, [layers])

  useEffect(() => {
    const [gameEvent] = gameAction

    switch (gameEvent) {
      case GameEvent.Left:
      case GameEvent.Right:
      case GameEvent.Up:
      case GameEvent.Down:
        //turnRef.current.step(gameEvent)
        console.log(gameEvent)
        break
      case 'PAUSE':
    }
  }, [gameAction])

  useEffect(() => {
    //mapRef.current.resize(width, height)
  }, [width, height])

  console.log('layers', layers)

  return (
    <>
      <div ref={layersRef} className="layers"></div>
    </>
  )
}

export default MapScene


