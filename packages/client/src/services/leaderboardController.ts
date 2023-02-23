import leaderboardApi, {
  LeaderboardData,
  LeaderboardDataReq,
} from '@api/leaderboardApi'
import { apiErrorHandler } from '@utils/errorsHandling'
export const getLBData = (data: LeaderboardDataReq) =>
  leaderboardApi.getLeaderboardData(data).catch(error => apiErrorHandler(error))

export const putLBData = (data: LeaderboardData) =>
  leaderboardApi
    .pushLeaderboardData(data)
    .catch(error => apiErrorHandler(error))

export default { putLBData, getLBData }
