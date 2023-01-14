//Принцип инверсии зависимостей

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

type METHODS = typeof METHODS[keyof typeof METHODS]

type TRequestData = Record<string, string | number>

type TRequestOptions = {
  method?: METHODS
  headers?: Record<string, string>
  withCredentials?: boolean
  timeout?: number
  data?: unknown
}

type HTTPMethod<HttpResponse> = (
  url: string,
  options?: TRequestOptions
) => Promise<unknown>

interface Connection {
  request(url: string, options: TRequestOptions): Promise<unknown>
}

export function queryStringify(data: TRequestData) {
  if (!data) return ''
  return (
    '?' +
    Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  )
}

class HTTP {
  constructor(private httpConnection: Connection) {
    this.httpConnection = httpConnection
  }
  get: HTTPMethod<HttpResponse> = (url, options) => {
    return this.httpConnection.request(url, { ...options, method: METHODS.GET })
  }
  post: HTTPMethod<HttpResponse> = (url, options) => {
    return this.httpConnection.request(url, {
      ...options,
      method: METHODS.POST,
    })
  }
  put: HTTPMethod<HttpResponse> = (url, options) => {
    return this.httpConnection.request(url, { ...options, method: METHODS.PUT })
  }
  patch: HTTPMethod<HttpResponse> = (url, options) => {
    return this.httpConnection.request(url, {
      ...options,
      method: METHODS.PATCH,
    })
  }
  delete: HTTPMethod<HttpResponse> = (url, options) => {
    return this.httpConnection.request(url, {
      ...options,
      method: METHODS.DELETE,
    })
  }
}

class XMLHttpService implements Connection {
  request(url: string, options: TRequestOptions): Promise<unknown | APIError> {
    const {
      method = METHODS.GET,
      headers = {},
      data,
      timeout = 5000,
      withCredentials = true,
    } = options as TRequestOptions

    const query =
      method === METHODS.GET ? queryStringify(data as TRequestData) : ''

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url + query)

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }

      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(xhr)
        } else {
          const { response } = xhr
          resolve(response as HttpResponse)
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.timeout = timeout
      xhr.ontimeout = reject

      xhr.withCredentials = withCredentials
      xhr.responseType = 'json'

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

class FetchService implements Connection {
  request(url: string, options: TRequestOptions): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(res => res.json)
        .then(data => resolve(data as unknown as Promise<HttpResponse>))
        .catch(e => reject(e))
    })
  }
}

export const httpXML = new HTTP(new XMLHttpService())
export const httpFetch = new HTTP(new FetchService())
