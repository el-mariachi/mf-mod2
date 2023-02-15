import { useEffect, useState, useRef } from 'react'
import { useAppDispatch } from 'hooks/redux_typed_hooks'
import { finishLevel } from '@store/slices/game'
import { updateHealthByAmount } from '@store/slices/hero'
import { width, height } from '@utils/winsize'
import './MapScene.css'
import MapController from '@game/Controllers/MapController'
import { createLayers, LayerRecord } from '@game/Controllers/LayerController'
import hero from '@sprites/hero.png'
import dungeonTileset from '@sprites/tileset.png'
import skeleton from '@sprites/skeleton.png'
import { AIDemo } from '@game/mocks/aiDemo'
import { LevelMap } from '@game/core/types'
import MapSceneUI from '@game/components/MapSceneUI'

const images = [hero, dungeonTileset, skeleton]
function MapScene() {
  const [layers, setLayers]: [
    LayerRecord,
    React.Dispatch<React.SetStateAction<LayerRecord>>
  ] = useState({})
  const layersRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef({} as MapController)

  const dispatch = useAppDispatch()
  const simFinishLevel = () => {
    // TODO to be removed with the buttons
    dispatch(finishLevel())
  }
  const simDeath = () => {
    dispatch(updateHealthByAmount(-200))
  }
  /** создаем три слоя canvas для разных типов игровых объектов*/
  useEffect(() => {
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
      AIDemo(mapRef.current.map as LevelMap)
    }
  }, [layers])

  useEffect(() => {
    //mapRef.current.resize(width, height)
  }, [width, height])

  /** canvas добавляются при создания слоя Layer. Сделано для того, чтобы не
      обращаться к каждому слою через ref */
  return (
    // TODO remove test buttons
    <>
      <MapSceneUI />
      <div ref={layersRef} className="map-scene__layers"></div>
      {/* <div className="map-scene__buttons">
        <a className="mx-auto text-white" onClick={simFinishLevel}>
          test finish level
        </a>
        <a className="mx-auto text-white" onClick={simDeath}>
          test death
        </a>
      </div> */}
    </>
  )
}

export default MapScene
