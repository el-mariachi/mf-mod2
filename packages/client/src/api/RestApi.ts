import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  isAxiosError,
  AxiosResponse,
} from 'axios'
import { AppErrorCode, createAppError } from '@utils/errorsHandling'
import { API_BASE_URL, API_TIMEOUT } from '@constants/api'
import { getApiBaseUrl } from '@utils/index'

enum RestApiMethods {
  get = 'get',
  put = 'put',
  post = 'post',
  delete = 'delete',
}
type RestApiOpts = AxiosRequestConfig
type RestApiData = FormData | PlainObject
type RestApiResponse<T> = AxiosResponse<T> & {
  data: {
    reason: string
  }
}

export default class RestApi {
  protected _http: AxiosInstance

  constructor(
    protected _apiPath = '',
    opts: RestApiOpts = {},
    protected _apiBaseUrl = getApiBaseUrl(API_BASE_URL)
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
        const response = isAxiosError(error)
          ? (error.response as RestApiResponse<T>)
          : null
        const request = isAxiosError(error) ? error.request : null

        let msg = rawMsg
        let code = AppErrorCode.unknown

        if (response) {
          const statusCode = response.status
          if (response?.data?.reason) {
            msg = response.data.reason as string
          }
          switch (statusCode) {
            case AppErrorCode.restApiRequest:
            case 409:
              code = AppErrorCode.restApiRequest
              msg ||= 'bad request'
              break

            case AppErrorCode.restApiAuth:
            case 407:
              code = statusCode
              msg ||= 'unauthorized'
              break

            case AppErrorCode.restApiAccess:
              code = statusCode
              msg ||= 'have no access'
              break

            case AppErrorCode.restApiNoResource:
              code = statusCode
              msg ||= 'non-existent resource'
              break

            case AppErrorCode.restApiDependency:
              code = statusCode
              msg ||= 'data dependencies or logic error'
              break

            case AppErrorCode.restApiServer:
              code = statusCode
              msg ||= 'unexpected server error'
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

        throw createAppError(msg, code, 'rest api', rawMsg)
      })
  }
}
