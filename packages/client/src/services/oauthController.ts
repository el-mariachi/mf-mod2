import oauthApi from '@api/oauthApi'
import { API_OAUTH_REDIRECT_URL, API_YANDEX_OAUTH_URL } from '@constants/api'

interface Strategy {
  authenticate(args: unknown[]): Promise<boolean>
}

export const signInWithYandex = () => {
  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    return new Promise((resolve, reject) => {
      window.history.pushState({}, '', API_OAUTH_REDIRECT_URL)
      return oauthApi
        .signInWithYandexId({
          code,
          redirect_uri: API_OAUTH_REDIRECT_URL,
        })
        .then(resolve)
        .catch(reject)
    })
  }
  return Promise.resolve()
}

export const SignInWithOauth = () => {
  return signInWithYandex()
}

class Authenticator {
  strategies: Record<string, Strategy> = {}

  use(serviceName: string, strategy: Strategy) {
    this.strategies[serviceName] = strategy
  }

  async authenticate(serviceName: string, ...args: any) {
    if (!this.strategies[serviceName]) {
      console.error('Политика аутентификации не установлена!')
      return false
    }

    return this.strategies[serviceName].authenticate.apply(null, args)
  }
}

class YandexStrategy implements Strategy {
  async authenticate() {
    const { service_id } = await oauthApi.getYandexServiceId(
      API_OAUTH_REDIRECT_URL
    )
    const url = new URL(API_YANDEX_OAUTH_URL)
    url.searchParams.set('client_id', service_id)
    url.searchParams.set('redirect_uri', API_OAUTH_REDIRECT_URL)
    window.location.href = url.href
    return true
  }
}

const auth = new Authenticator()
/** использовать авторизацию Яндекса,
 * также можно добавить другие сервисы авторизации VK, Google */
auth.use('yandex', new YandexStrategy())

const oauth = (mode: string, ...args: unknown[]) => {
  return auth.authenticate(mode, args)
}

export default oauth
