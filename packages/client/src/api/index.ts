import RestApi from '@api/RestApi'
import { MockApi } from '@api/ssrApiMock'

let restAuthApi: MockApi | RestApi
let restUsersApi: MockApi | RestApi
let restResourceApi: MockApi | RestApi
let restLeaderboardApi: MockApi | RestApi
let restOauthApi: MockApi | RestApi
let restAppThemesApi: MockApi | RestApi
let restAppUserApi: MockApi | RestApi

if (RENDERED_ON_SERVER) {
  restAuthApi = new MockApi()
  restUsersApi = new MockApi()
  restResourceApi = new MockApi()
  restOauthApi = new MockApi()
  restLeaderboardApi = new MockApi()
  restAppThemesApi = new MockApi()
  restAppUserApi = new MockApi()
} else {
  restAuthApi = new RestApi('/auth')
  restUsersApi = new RestApi('/user')
  restResourceApi = new RestApi('/resources')
  restLeaderboardApi = new RestApi('/leaderboard')
  restOauthApi = new RestApi('/oauth/yandex')
  restLeaderboardApi = new RestApi('/leaderboard')
  restAppThemesApi = new RestApi('/themes', {}, '/api')
  restAppUserApi = new RestApi('/user', {}, '/api')
}

export {
  restAuthApi,
  restUsersApi,
  restResourceApi,
  restLeaderboardApi,
  restOauthApi,
  restAppThemesApi,
  restAppUserApi,
}
