import LeaderboardList from '../../components/Leaderboard/List/Lb-List'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Leaderboard.css'
import { Button } from 'react-bootstrap'

function Leaderboard() {
  return (
    <>
        <div className="mx-auto lb-cont">
        <h1 className="text-center mx-auto display-4">Список лидеров</h1>

        <LeaderboardList />

        <Button className="text-center btn-start">Играть!</Button>
        </div>
    </>
  )
}

export default Leaderboard
