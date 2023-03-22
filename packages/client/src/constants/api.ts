const API_HOST = import.meta.env.PROD
  ? 'https://team7-onebit-dungeon.ya-praktikum.tech'
  : 'http://localhost:3001'
const API_BASE_URL = `${API_HOST}/api`
const API_TIMEOUT = 5000
const API_OAUTH_REDIRECT_URL = API_HOST
const API_YANDEX_OAUTH_URL = `https://oauth.yandex.ru/authorize?response_type=code`
export const TEAM_NAME_LB_API = 'team-seven'

export {
  API_HOST,
  API_BASE_URL,
  API_TIMEOUT,
  API_OAUTH_REDIRECT_URL,
  API_YANDEX_OAUTH_URL,
}
