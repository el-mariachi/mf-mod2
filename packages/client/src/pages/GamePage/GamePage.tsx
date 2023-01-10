import { useState, useEffect } from 'react'
import Canvas from '../../components/Canvas'
import mainLoop from '../../game/main_loop'
import { Draw } from '../../components/Canvas/Canvas'

enum GamePageMode {
  StartScreen,
  Game,
  ResultsScreen,
}

const startDummy: Draw = ctx => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.font = '700 24px Arial'
  ctx.fillText('Start game', ctx.canvas.width / 2, ctx.canvas.height / 2)
}
const resultsDummy: Draw = ctx => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.font = '700 24px Arial'
  ctx.fillText('Game over', ctx.canvas.width / 2, ctx.canvas.height / 2)
}

function GamePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gamePageMode, setGamePageMode] = useState(GamePageMode.StartScreen) // TODO to be moved to store

  useEffect(() => {
    // load game assets
  }, [])

  let drawingFunction = startDummy
  switch (gamePageMode) {
    case GamePageMode.StartScreen:
      drawingFunction = startDummy // function 1
      break
    case GamePageMode.Game:
      drawingFunction = mainLoop // function 2
      break
    case GamePageMode.ResultsScreen:
      drawingFunction = resultsDummy // function 3
      break
    default:
      break
  }
  console.log('Game mode', gamePageMode)

  return (
    <>
      {/* Nav */}
      <Canvas draw={drawingFunction} width={375} height={667} />
      <button
        onClick={() => {
          setGamePageMode(GamePageMode.StartScreen)
        }}>
        Start
      </button>
      <button
        onClick={() => {
          setGamePageMode(GamePageMode.Game)
        }}>
        Game
      </button>
      <button
        onClick={() => {
          setGamePageMode(GamePageMode.ResultsScreen)
        }}>
        Result
      </button>
    </>
  )
}

export default GamePage
