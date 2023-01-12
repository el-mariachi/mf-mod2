import { useNavigate } from 'react-router-dom'
import LeaderboardList from '../../components/Leaderboard/List/Lb-List'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Leaderboard.css'
import { Button } from 'react-bootstrap'

function Leaderboard() {
  const navigate = useNavigate()
  const onStartGame = () => {
    navigate('/game')
  }

  return (
    <>
      <div className="mx-auto lb-cont">
        <h1 className="text-center mx-auto display-4">Список лидеров</h1>

        <LeaderboardList />

        <Button className="text-center btn-start" onClick={onStartGame}>
          Играть!
        </Button>
      </div>
    </>
  )
}

export default Leaderboard
