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

export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
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
