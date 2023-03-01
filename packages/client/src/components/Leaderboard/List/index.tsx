import LeaderboardProps from '../Props'
import Lb_User from '../Element'
import { Stack } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { LeaderboardDataReq, LeaderboardDataResp } from '@api/leaderboardApi'
import { getLBData } from '@services/leaderboardController'
import SecondsToHMS from '@utils/secondsFormat'

const inputData: LeaderboardDataResp[] = []

enum SortedVal {
  score = 'score',
  coins = 'coins',
  steps = 'steps',
  time = 'time',
  kills = 'killCount',
}

function LeaderboardList() {
  const [sortMode, setSortMode] = useState(0)
  const [lbData, setLbData] = useState(inputData)

  const req: LeaderboardDataReq = {
    ratingFieldName: 'coins',
    cursor: 0,
    limit: 10,
  }

  useEffect(() => {
    getLBData(req).then((data: LeaderboardDataResp[]) => {
      setLbData(data)
    })
  })

  let counter = 0
  let sortedVal = SortedVal.score

  switch (sortMode) {
    case 0:
      sortedVal = SortedVal.score
      lbData.sort((a, b) => {
        return b.data.score - a.data.score
      })
      break
    case 1:
      sortedVal = SortedVal.coins
      lbData.sort((a, b) => {
        return b.data.coins - a.data.coins
      })
      break
    case 2:
      sortedVal = SortedVal.steps
      lbData.sort((a, b) => {
        if (b.data.steps > a.data.steps) {
          return -1
        } else if (b.data.steps < a.data.steps) {
          return 1
        } else {
          return 0
        }
      })
      break
    case 3:
      sortedVal = SortedVal.time
      lbData.sort((a, b) => {
        if (b.data.time > a.data.time) {
          return -1
        } else if (b.data.time < a.data.time) {
          return 1
        } else {
          return 0
        }
      })
      break
    case 4:
      sortedVal = SortedVal.kills
      lbData.sort((a, b) => {
        return b.data.killCount - a.data.killCount
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
          <option value="0">Счет</option>
          <option value="1">Монеты</option>
          <option value="2">Шаги</option>
          <option value="3">Время</option>
          <option value="4">Враги</option>
        </Form.Select>
      </div>
      <div className="overflow-auto">
        <Stack gap={2}>
          {lbData.map(user => {
            counter++
            const val =
              sortedVal == SortedVal.time
                ? SecondsToHMS(user?.data[sortedVal]).toString()
                : user.data[sortedVal]?.toString()
            return (
              <Lb_User
                key={user?.data.nickname ? user?.data.nickname : 0}
                place={counter}
                nickname={
                  user?.data.nickname ? user?.data.nickname : '[username]'
                }
                coins={user?.data.coins ? user?.data.coins : 0}
                killCount={user?.data.killCount ? user?.data.killCount : 0}
                score={user?.data.score ? user?.data.score : 0}
                time={user?.data.time ? user?.data.time : 0}
                steps={user?.data.steps ? user?.data.steps : 0}
                sortedVal={val ? val : '0'}
              />
            )
          })}
        </Stack>
      </div>
    </>
  )
}

export default LeaderboardList
