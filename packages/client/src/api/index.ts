import RestApi from '@api/RestApi'
import { MockApi } from '@api/ssrApiMock'

let restAuthApi: MockApi | RestApi
let restUsersApi: MockApi | RestApi
let restResourceApi: MockApi | RestApi
let restLeaderboardApi: MockApi | RestApi
let restOauthApi: MockApi | RestApi
let restAppThemesApi: MockApi | RestApi
let restAppUserApi: MockApi | RestApi
let restTopicApi: MockApi | RestApi
let restCommentApi: MockApi | RestApi

if (RENDERED_ON_SERVER) {
  restAuthApi = new MockApi()
  restUsersApi = new MockApi()
  restResourceApi = new MockApi()
  restOauthApi = new MockApi()
  restLeaderboardApi = new MockApi()
  restAppThemesApi = new MockApi()
  restAppUserApi = new MockApi()
  restTopicApi = new MockApi()
  restCommentApi = new MockApi()
} else {
  restAuthApi = new RestApi('/auth')
  restUsersApi = new RestApi('/user')
  restResourceApi = new RestApi('/resources')
  restLeaderboardApi = new RestApi('/leaderboard')
  restOauthApi = new RestApi('/oauth/yandex')
  restAppThemesApi = new RestApi('/themes', { withCredentials: false }, '/api')
  restAppUserApi = new RestApi('/user', { withCredentials: false }, '/api')
  restTopicApi = new RestApi('/topic')
  restCommentApi = new RestApi('/comment')
}

export {
  restAuthApi,
  restUsersApi,
  restResourceApi,
  restLeaderboardApi,
  restOauthApi,
  restAppThemesApi,
  restAppUserApi,
  restTopicApi,
  restCommentApi,
}
