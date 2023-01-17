import ResScene from '@game/scenes/ResultsScreen/Scene/ResScene'
import ResultsProps from '@game/scenes/ResultsScreen/Props/ResultsProps'

function ResultsPage() {
  function restart() {
    alert('Restart!')
  }

  function exit() {
    alert('exit!')
  }

  const props: ResultsProps = {
    levelNum: 5,
    killCount: 10,
    coins: 10,
    time: 67,
    steps: 10,
    restartCallback: restart,
    exitCallback: exit,
  }

  return (
    <>
      <ResScene {...props}></ResScene>
    </>
  )
}

export default ResultsPage
