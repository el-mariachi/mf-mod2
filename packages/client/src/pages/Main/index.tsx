import AppDefaultTpl from '@components/AppDefaultTpl'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@constants/routes'
import './Main.scss'

const Main = () => {
  const navigate = useNavigate()
  const play = () => {
    navigate(ROUTES.GAME)
  }
  return (
    <AppDefaultTpl className="leaderboard">
      <h1 className="h3 mb-4">Сайт игры One Bit Dungeon, плиз велкам!</h1>

      <p>
        Тут будет описание игры. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Possimus nam suscipit nisi minima beatae quis, debitis
        nemo dolore ratione exercitationem dolores rerum impedit natus totam
        барбамбия киргуду!
      </p>

      <p>
        Тут будет информация как играть. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Possimus nam suscipit nisi minima beatae quis, debitis
        nemo dolore ratione exercitationem dolores rerum impedit natus totam
        veniam est laboriosam. барбамбия киргуду!
      </p>

      <p>
        Тут будет информация как играть. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Possimus nam suscipit nisi minima beatae quis, debitis
        nemo dolore ratione exercitationem dolores rerum impedit natus totam
        veniam est laboriosam. Doloribus, obcaecati!
      </p>

      <Button className="text-center main__btn-start" onClick={play}>
        Играть!
      </Button>
    </AppDefaultTpl>
  )
}

export default Main
