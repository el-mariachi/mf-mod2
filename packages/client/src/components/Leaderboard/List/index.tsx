import Lb_User from '../Element'
import { Stack } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { LeaderboardDataReq, LeaderboardDataResp } from '@api/leaderboardApi'
import { getLBData } from '@services/leaderboardController'
import { MsecondsToHMS } from '@utils/secondsFormat'
import {
  clientSideErrorHandler,
  serverErrorHandler,
} from '@utils/errorsHandling'
import { muteRes } from '@utils/index'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@constants/routes'
import insertionSort from '@utils/insertionSort'

const inputData: LeaderboardDataResp[] = []

if (!Array.prototype.customSort) {
  Array.prototype.customSort = insertionSort
}

export enum SortedVal {
  score = 'score',
  coins = 'coins',
  steps = 'steps',
  time = 'time',
  kills = 'killCount',
}

function LeaderboardList() {
  const [sortMode, setSortMode] = useState(SortedVal.score)
  const [lbData, setLbData] = useState(inputData)
  const navigate = useNavigate()

  const req: LeaderboardDataReq = {
    ratingFieldName: 'score',
    cursor: 0,
    limit: 10,
  }

  useEffect(() => {
    getLBData(req)
      .then((data: LeaderboardDataResp[]) => {
        setLbData(data)
      })
      .catch(error => {
        clientSideErrorHandler(error, muteRes)
        serverErrorHandler(error, () => navigate(ROUTES.SERVER_ERROR))
      })
  }, [])

  let counter = 0

  if (lbData.length > 0) {
    lbData.customSort(sortMode)
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
            setSortMode(e.currentTarget.value as SortedVal)
          }}
          className="flex-1">
          <option value={SortedVal.score}>Счет</option>
          <option value={SortedVal.coins}>Монеты</option>
          <option value={SortedVal.steps}>Шаги</option>
          <option value={SortedVal.time}>Время</option>
          <option value={SortedVal.kills}>Враги</option>
        </Form.Select>
      </div>
      <div className="overflow-auto">
        <Stack gap={2}>
          {lbData.map((user, idx) => {
            counter++
            const val =
              sortMode == SortedVal.time
                ? MsecondsToHMS(user.data[sortMode])?.toString()
                : user.data[sortMode]?.toString()
            return (
              <Lb_User
                key={idx}
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
