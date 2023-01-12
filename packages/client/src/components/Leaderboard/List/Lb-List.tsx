import LeaderboardProps from '../../Props/Lb-Props'
import Lb_User from '../Element/Lb-ListElement'
import { Stack } from 'react-bootstrap'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const inputData = [
  {
    nickname: 'User1',
    score: 9999,
    date: '26.12.2022',
    time: '00:01:27',
    kills: 0,
  },
  {
    nickname: 'User2',
    score: 8000,
    date: '25.12.2022',
    time: '00:10:35',
    kills: 10,
  },
  {
    nickname: 'User3',
    score: 5000,
    date: '14.12.2022',
    time: '01:00:00',
    kills: 1000,
  },
  {
    nickname: 'User4',
    score: 5000,
    date: '14.12.2022',
    time: '01:00:00',
    kills: 1000,
  },
  {
    nickname: 'User5',
    score: 5000,
    date: '14.12.2022',
    time: '01:00:00',
    kills: 1000,
  },
  {
    nickname: 'User6',
    score: 5000,
    date: '14.12.2022',
    time: '01:00:00',
    kills: 1000,
  },
  {
    nickname: 'User7',
    score: 5000,
    date: '14.12.2022',
    time: '01:00:00',
    kills: 1000,
  },
  {
    nickname: 'User8',
    score: 2000,
    date: '30.12.2022',
    time: '01:11:27',
    kills: 2,
  },
]

function LeaderboardList() {
  const [sortMode, setSortMode] = useState(1)

  let counter = 0
  let sortedVal = 'score'

  switch (sortMode) {
    case 1:
      sortedVal = 'score'
      inputData.sort((a, b) => {
        return b.score - a.score
      })
      break
    case 2:
      sortedVal = 'date'
      inputData.sort((a, b) => {
        if (b.date > a.date) {
          return -1
        } else if (b.date < a.date) {
          return 1
        } else {
          return 0
        }
      })
      break
    case 3:
      sortedVal = 'time'
      inputData.sort((a, b) => {
        if (b.time > a.time) {
          return -1
        } else if (b.time < a.time) {
          return 1
        } else {
          return 0
        }
      })
      break
    case 4:
      sortedVal = 'kills'
      inputData.sort((a, b) => {
        return b.kills - a.kills
      })
      break
  }

  return (
    <>
      <div className="d-flex flex-row mb-3">
        <p className="flex-2 text-end align-middle p-2 my-auto">
          Сортировать по:
        </p>
        <Form.Select
          id="sortSelect"
          onChange={e => {
            setSortMode(Number(e.currentTarget.value))
          }}
          className="flex-1">
          <option value="1">Счет</option>
          <option value="2">Дата</option>
          <option value="3">Время</option>
          <option value="4">Враги</option>
        </Form.Select>
      </div>
      <div className="users-list overflow-auto">
        <Stack gap={2}>
          {inputData.map(user => {
            counter++
            return (
              <Lb_User
                key={user.nickname}
                place={counter}
                nickname={user.nickname}
                score={user.score}
                date={user.date}
                time={user.time}
                kills={user.kills}
                sortedVal={user[sortedVal]}
              />
            )
          })}
        </Stack>
      </div>
    </>
  )
}

export default LeaderboardList
