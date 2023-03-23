const API_BASE_URL = `/api`
const API_TIMEOUT = 5000
/** Для редиректа зарегистрирован адрес localhost:3000
 * Поэтому OAuth можно использовать только запустив проект в контейнерах client, server, postgres
 */
const API_OAUTH_REDIRECT_URL = `https://team7-onebit-dungeon.ya-praktikum.tech`
const API_YANDEX_OAUTH_URL = `https://oauth.yandex.ru/authorize?response_type=code`
export const TEAM_NAME_LB_API = 'team-seven'

export {
  API_BASE_URL,
  API_TIMEOUT,
  API_OAUTH_REDIRECT_URL,
  API_YANDEX_OAUTH_URL,
}
