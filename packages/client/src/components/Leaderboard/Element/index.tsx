import LeaderboardProps from '../Props'
import { Button, Collapse } from 'react-bootstrap'
import dummyAvatarImg from '@images/king.png'
import { useState } from 'react'
import { MsecondsToHMS } from '@utils/secondsFormat'
import ForumAvatar from '@components/ForumAvatar'

function Lb_User({
  place,
  nickname,
  killCount,
  score,
  coins,
  time,
  steps,
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
            <li className="list-group-item">Счет: {score} </li>
            <li className="list-group-item">Монеты: {coins} </li>
            <li className="list-group-item">Время: {MsecondsToHMS(time)} </li>
            <li className="list-group-item">Шаги: {steps} </li>
            <li className="list-group-item">Убитых врагов: {killCount} </li>
          </ul>
          <ForumAvatar
            image={dummyAvatarImg}
            alt={`Аватар ${nickname}`}
            className="lb-avatar"
          />
        </div>
      </Collapse>
    </>
  )
}

export default Lb_User
