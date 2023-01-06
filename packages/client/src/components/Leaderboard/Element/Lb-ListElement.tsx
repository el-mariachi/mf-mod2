import LeaderboardProps from '../Props/Lb-Props'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import { useState } from 'react'

function Lb_User({
  place,
  nickname,
  score,
  date,
  time,
  kills,
  sortedVal,
}: LeaderboardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant="dark"
        size="lg"
        className="d-flex flex-row justify-content-between">
        <div>
          #{place} {nickname}
        </div>
        <div>{sortedVal}</div>
      </Button>
      <Collapse in={open}>
        <div className="flex flex-row justify-content-between border border-1 border-dark rounded fs-5">
          <ul className="d-inline-block flex-1">
            <li className="list-group-item">Дата: {date} </li>
            <li className="list-group-item">Время: {time} </li>
            <li className="list-group-item">Счет: {score} </li>
            <li className="list-group-item">Убитых врагов: {kills} </li>
          </ul>
          <img
            src="../"
            className="rounded-circle flex-2 d-inline-block lb-avatar border border-2"></img>
        </div>
      </Collapse>
    </>
  )
}

export default Lb_User
