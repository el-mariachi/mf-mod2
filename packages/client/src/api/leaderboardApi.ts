import { restLeaderboardApi } from '@api/restApi'
import { GameStats } from '@constants/game'

export type LeaderboardData = {
  data: GameStats
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
  restLeaderboardApi.post<LeaderboardDataResp[]>('/team-seven-test', data)
