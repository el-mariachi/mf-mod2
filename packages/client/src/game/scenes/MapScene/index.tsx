import { useEffect, useState, useRef } from 'react'
import { width, height } from '@utils/winsize'
import './MapScene.css'
import MapController from '@game/Controllers/MapController'
import { createLayers, LayerRecord } from '@game/Controllers/LayerController'
import { aiDemo } from '@game/mocks/aiDemo'

function MapScene() {
  const [layers, setLayers]: [
    LayerRecord,
    React.Dispatch<React.SetStateAction<LayerRecord>>
  ] = useState({})
  const layersRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef({} as MapController)

  /** создаем три слоя canvas для разных типов игровых объектов*/
  useEffect(() => {
    const layers: LayerRecord = createLayers(
      ['static', 'active', 'effetcs'],
      [width, height]
    )
    setLayers(layers)
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
      aiDemo(mapRef.current.map);
    }
  }, [layers])

  useEffect(() => {
    //mapRef.current.resize(width, height)
  }, [width, height])

  /** canvas добавляются при создания слоя Layer. Сделано для того, чтобы не
      обращаться к каждому слою через ref */
  return <div ref={layersRef} className="map-scene__layers"></div>
}

export default MapScene
