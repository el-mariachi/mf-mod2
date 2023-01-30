import AppDefaultTpl from '@components/AppDefaultTpl'
import { Button } from 'react-bootstrap'

function Main() {
  return (
    <AppDefaultTpl className="leaderboard">
      <h1 className="h3 mb-4">Сайт игры One Bit Dungeon, плиз велкам!</h1>

      <p>
        Тут будет описание игры. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Possimus nam suscipit nisi minima beatae quis, debitis
        nemo dolore ratione exercitationem dolores rerum impedit natus totam
        veniam est laboriosam. Doloribus, obcaecati!
      </p>

      <p>
        <iframe
          width="100%"
          height="350"
          src="https://www.youtube.com/embed/_KKkPiIMogc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </p>

      <p>
        Тут будет информация как играть. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Possimus nam suscipit nisi minima beatae quis, debitis
        nemo dolore ratione exercitationem dolores rerum impedit natus totam
        veniam est laboriosam. Doloribus, obcaecati!
      </p>

      <p>
        Тут будет информация как играть. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Possimus nam suscipit nisi minima beatae quis, debitis
        nemo dolore ratione exercitationem dolores rerum impedit natus totam
        veniam est laboriosam. Doloribus, obcaecati!
      </p>

      <Button className="text-center btn-start">Играть!</Button>
    </AppDefaultTpl>
  )
}

export default Main
