import { useEffect, useRef } from 'react'
import { ProgressBar } from '../../animations/ProgressBar'
import { useFonts } from '@hooks/useFonts'
import { width, height, center } from '@utils/winsize'
import { Text } from '@utils/fillCanvas'
import { useDispatch } from 'react-redux'
import { actions } from '@store/index'
import hero from '@sprites/hero.png'
import dungeonTileset from '@sprites/tileset.png'
import skeleton from '@sprites/skeleton.png'

const { startGame } = actions

function LoadScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fontLoaded = useFonts(false)
  const dispatch = useDispatch()
  const images = [hero, dungeonTileset, skeleton]
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const progressBar: ProgressBar = new ProgressBar({
        color: 'white',
        ctx,
        x: center.width - 80,
        y: center.height + 140,
        width: 165,
        heigth: 15,
      })

      if (ctx) {
        const text = new Text({
          ctx,
          textBaseline: 'middle',
          fillStyle: 'white',
          textAlign: 'center',
          font: '700 48px Minecraft',
        })

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)
        text.fill('One Bit', center.width, center.height)
        text.fill('Dungeon', center.width, center.height + 45)
        text.fill('loading...', center.width, center.height + 115, {
          font: '400 24px Minecraft',
        })
        progressBar.draw()
      }
    }
  }, [fontLoaded])

  useEffect(() => {
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
      dispatch(startGame())
    })
  }, [])

  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default LoadScene
