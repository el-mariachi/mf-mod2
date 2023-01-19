import LeaderboardList from '@components/Leaderboard/List'
import AppDefaultTpl from '@components/AppDefaultTpl'
import { Button } from 'react-bootstrap'
import './Leaderboard.scss'
import { LoggedInCheck } from 'hoc/LoggedInCheck'
import type { LoggedInCheckOptions } from 'hoc/LoggedInCheck'
import ROUTES from '@constants/routes'

const Leaderboard = () => {
  return (
    <AppDefaultTpl className="leaderboard">
      <h1 className="h3 mb-4">Список лидеров</h1>

      <LeaderboardList />

      <Button className="text-center btn-start">Играть!</Button>
    </AppDefaultTpl>
  )
}
const checkOptions: LoggedInCheckOptions = {
  userRequired: true,
  escapeRoute: ROUTES.SIGN_IN,
}

export default LoggedInCheck(checkOptions)(Leaderboard)
