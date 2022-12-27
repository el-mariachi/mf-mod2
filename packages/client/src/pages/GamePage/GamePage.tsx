import StartScene from '../../game/scenes/StartScene'

function GamePage() {
  return (
    <StartScene
      width={document.documentElement.clientWidth}
      height={document.documentElement.clientHeight}
    />
  )
}

export default GamePage
