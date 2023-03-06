import { restLeaderboardApi } from '@api/restApi'
import { GameStats } from '@constants/game'
import { TEAM_NAME_LB_API } from '@constants/api'

export type LeaderboardData = {
  data: GameStats & { score: number; nickname: string }
  ratingFieldName: string
  teamName: string
}

export type LeaderboardDataReq = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type LeaderboardDataResp = {
  data: {
    nickname: string
    score: number
    killCount: number
    coins: number
    time: number
    steps: number
  }
}

export const pushLeaderboardData = (data: LeaderboardData) =>
  restLeaderboardApi.post<number>('/', data)

export const getLeaderboardData = (data: LeaderboardDataReq) =>
  restLeaderboardApi.post<LeaderboardDataResp[]>('/' + TEAM_NAME_LB_API, data)

export default { pushLeaderboardData, getLeaderboardData }
