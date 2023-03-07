const API_PORT = __SERVER_PORT__ || 3001
const API_HOST = `http://localhost`
const API_BASE_URL = `${API_HOST}:${API_PORT}/api`
const API_TIMEOUT = 5000
/** Для редиректа зарегистрирован адрес localhost:3000
 * TODO Если будет домен, нужно будет его зарегистрировать у наставника, 
 * если нет зарегистрировать localhost:3001
 */
const API_OAUTH_REDIRECT_URL = `http://localhost:${API_PORT}`
const API_YANDEX_OAUTH_URL = `https://oauth.yandex.ru/authorize?response_type=code`
export {
  API_HOST,
  API_BASE_URL,
  API_TIMEOUT,
  API_OAUTH_REDIRECT_URL,
  API_YANDEX_OAUTH_URL,
}
