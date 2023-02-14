import LeaderboardProps from '../Props'
import { Button, Collapse } from 'react-bootstrap'
import dummyAvatarImg from '@images/king.png'
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
        <div className="flex flex-row justify-content-between border border-1 fs-6 p-3">
          <ul className="d-inline-block flex-1 p-0 m-0">
            <li className="list-group-item">Дата: {date} </li>
            <li className="list-group-item">Время: {time} </li>
            <li className="list-group-item">Счет: {score} </li>
            <li className="list-group-item">Убитых врагов: {kills} </li>
          </ul>
          <img
            src={dummyAvatarImg}
            className="rounded-circle flex-2 d-inline-block lb-avatar border border-2"></img>
        </div>
      </Collapse>
    </>
  )
}

export default Lb_User
