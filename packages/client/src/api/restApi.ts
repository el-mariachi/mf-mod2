import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  isAxiosError,
} from 'axios'
import { AppErrorCode, createAppError } from '@utils/errorsHandling'
import { API_BASE_URL, API_TIMEOUT } from '@constants/api'
import { MockApi } from '@api/ssrApiMock'

enum RestApiMethods {
  get = 'get',
  put = 'put',
  post = 'post',
  delete = 'delete',
}
type RestApiOpts = AxiosRequestConfig
type RestApiData = FormData | PlainObject

class RestApi {
  protected _http: AxiosInstance

  constructor(
    protected _apiPath = '',
    opts: RestApiOpts = {},
    protected _apiBaseUrl = API_BASE_URL
  ) {
    delete opts.baseURL // must be passed explicitly by params
    this._http = axios.create({
      ...{
        baseURL: this.url,
        timeout: API_TIMEOUT,
        withCredentials: true,
      },
      ...opts,
    })
  }
  get url() {
    return this._apiBaseUrl + this._apiPath
  }
  get<T>(url = '', opts: RestApiOpts = {}) {
    return this._request<T>(RestApiMethods.get, url, opts)
  }
  post<T>(url = '', data?: RestApiData, opts?: RestApiOpts) {
    return this._request<T>(RestApiMethods.post, url, opts, data)
  }
  put<T>(url = '', data?: RestApiData, opts?: RestApiOpts) {
    return this._request<T>(RestApiMethods.put, url, opts, data)
  }
  delete(url = '', opts: RestApiOpts = {}) {
    return this._request(RestApiMethods.delete, url, opts)
  }
  protected _request<T>(
    method: RestApiMethods,
    url = '',
    opts: RestApiOpts = {},
    data?: RestApiData
  ) {
    opts.method = method
    opts.url = url
    if (data) {
      opts.data = data
    }
    return this.request<T>(opts)
  }
  request<T>(opts: RestApiOpts) {
    return this._http
      .request<T>(opts)
      .then(response => response.data as T)
      .catch((error: AxiosError | Error) => {
        const rawMsg = error.message
        const response = isAxiosError(error) ? error.response : null
        const request = isAxiosError(error) ? error.request : null

        let msg = rawMsg
        let code = AppErrorCode.unknown

        if (response) {
          const statusCode = response.status
          msg = response.data?.reason

          switch (statusCode) {
            case AppErrorCode.restApiRequest:
            case 409:
              code = AppErrorCode.restApiRequest
              msg ||= 'bad request'
              break

            case AppErrorCode.restApiAuth:
              code = statusCode
              msg ||= 'unauthorized'
              break

            case AppErrorCode.restApiAccess:
              code = statusCode
              msg ||= 'have no access'
              break

            case AppErrorCode.restApiUrl:
              code = statusCode
              msg ||= 'non-existent url'
              break

            case AppErrorCode.restApiServer:
              code = statusCode
              msg ||= 'unexpected error'
              break

            default:
              msg ||= 'unknown error'
              break
          }
        } else if (request) {
          msg = 'no response was received'
        } else {
          code = AppErrorCode.dev
        }

        if (code != AppErrorCode.restApiAuth) {
          console.error(msg, rawMsg, error)
        }

        throw createAppError(msg, code, 'rest api', rawMsg)
      })
  }
}

let restAuthApi: MockApi | RestApi
let restUsersApi: MockApi | RestApi
let restResourceApi: MockApi | RestApi
let restLeaderboardApi: MockApi | RestApi

if (RENDERED_ON_SERVER) {
  restAuthApi = new MockApi()
  restUsersApi = new MockApi()
  restResourceApi = new MockApi()
} else {
  restAuthApi = new RestApi('/auth')
  restUsersApi = new RestApi('/user')
  restResourceApi = new RestApi('/resources')
  restLeaderboardApi = new RestApi('/leaderboard')
}

export { restAuthApi, restUsersApi, restResourceApi, restLeaderboardApi }
