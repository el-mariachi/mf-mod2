import LeaderboardList from '@components/Leaderboard/List'
import AppDefaultTpl from '@components/AppDefaultTpl'
import { Button } from 'react-bootstrap'
import './Leaderboard.scss'
import { authorizedPageAccessOpts, LoggedInCheck } from 'hoc/LoggedInCheck'
import { useNavToGame } from '@hooks/useNavToGame'

const Leaderboard = () => {
  const navToGame = useNavToGame()
  return (
    <AppDefaultTpl className="leaderboard">
      <h1 className="h3 mb-4">Список лидеров</h1>

      <LeaderboardList />

      <Button className="text-center btn-start" onClick={navToGame}>
        Играть!
      </Button>
    </AppDefaultTpl>
  )
}

export default LoggedInCheck(authorizedPageAccessOpts)(Leaderboard)
