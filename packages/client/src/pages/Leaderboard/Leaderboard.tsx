import LeaderboardList from '../../components/Leaderboard/List/Lb-List'
import AppDefaultTpl from '../../components/AppDefaultTpl'
import { Button } from 'react-bootstrap'
import './Leaderboard.scss'

function Leaderboard() {
  return (
    <AppDefaultTpl showNav={true} className="leaderboard">
      <h1 className="h3 mb-4">Список лидеров</h1>

      <LeaderboardList />

      <Button className="text-center btn-start">Играть!</Button>
    </AppDefaultTpl>
  )
}

export default Leaderboard
