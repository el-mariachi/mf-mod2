import LeaderboardProps from '../Props'
import Lb_User from '../Element'
import { Stack } from 'react-bootstrap'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import {
  GetLeaderboardData,
  LeaderboardDataReq,
  LeaderboardDataResp,
} from '@api/leaderboardApi'
import SecondsToHMS from '@utils/secondsFormat'

let inputData: LeaderboardDataResp[]

enum SortedVal {
  coins = 'coins',
  steps = 'steps',
  time = 'time',
  kills = 'killCount',
}

function LeaderboardList() {
  const [sortMode, setSortMode] = useState(1)
  const [lbData, setLbData] = useState(inputData)

  const req: LeaderboardDataReq = {
    ratingFieldName: 'coins',
    cursor: 0,
    limit: 10,
  }

  GetLeaderboardData(req).then((data: LeaderboardDataResp[]) => {
    setLbData(data)
  })

  let counter = 0
  let sortedVal = SortedVal.coins

  switch (sortMode) {
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
            return (
              <Lb_User
                key={user.data.nickname}
                place={counter}
                nickname={user.data.nickname}
                coins={user.data.coins}
                killCount={user.data.killCount}
                time={user.data.time}
                steps={user.data.steps}
                sortedVal={
                  sortedVal == SortedVal.time
                    ? SecondsToHMS(user.data[sortedVal]).toString()
                    : user.data[sortedVal].toString()
                }
              />
            )
          })}
        </Stack>
      </div>
    </>
  )
}

export default LeaderboardList
