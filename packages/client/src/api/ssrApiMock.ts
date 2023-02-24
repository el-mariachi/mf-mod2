import { AxiosRequestConfig } from 'axios'

type RestApiOpts = AxiosRequestConfig
type RestApiData = FormData | PlainObject
export class MockApi {
  get url() {
    return ''
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get<T>(url = '', opts: RestApiOpts = {}) {
    return new Promise<T>(resolve => {
      resolve({} as T)
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  post<T>(url = '', data?: RestApiData, opts?: RestApiOpts) {
    return new Promise<T>(resolve => {
      resolve({} as T)
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  put<T>(url = '', data?: RestApiData, opts?: RestApiOpts) {
    return new Promise<T>(resolve => {
      resolve({} as T)
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(url = '', opts: RestApiOpts = {}) {
    return Promise.resolve({})
  }
}
