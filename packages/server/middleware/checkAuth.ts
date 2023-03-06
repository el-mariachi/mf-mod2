import type { RequestHandler } from 'express'
import axios from 'axios'
import { YA_API_BASE_URL, API_TIMEOUT } from '../constants/api'

const axiosInstance = axios.create({
  baseURL: YA_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  timeout: API_TIMEOUT,
  withCredentials: true,
})
/*
axiosInstance.interceptors.request.use(
  request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  },
  error => {
    console.error('✉️ error', error)
  }
)
/*
axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
  },
  error => {
    console.error('✉️ error', error)
  }
)
*/
export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
  console.log('req ', req)
  axiosInstance
    .get(YA_API_BASE_URL + '/auth/user', {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    .then(response => {
      res.locals.user = response.data
      next()
    })
    .catch(err => {
      res.status(err.status ?? 401).json({
        type: 'error',
        message: err.response?.data?.reason ?? err.message,
      })
    })
}
