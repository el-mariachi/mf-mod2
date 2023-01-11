interface ResultsProps {
  levelNum: number
  killCount: number
  coins: number
  time: number
  steps: number
  restartCallback: (e: React.SyntheticEvent) => void
  exitCallback: (e: React.SyntheticEvent) => void
}
export default ResultsProps
