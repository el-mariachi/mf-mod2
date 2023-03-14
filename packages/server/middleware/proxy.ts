import type { RequestHandler } from 'express'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'
import { YA_API_BASE_URL } from '../constants/api'
import { User } from '@models/User'

const getUserFromBuffer = (buffer: Buffer) => {
  try {
    return JSON.parse(buffer.toString())
  } catch (e) {
    return null
  }
}

const insertUserInDbIfNotExists = (user: Record<string, string>) => {
  User.upsert({
    yandex_id: user.id,
    login: user.login,
    display_name: user.display_name,
    avatar: user.avatar,
  }).catch(err => {
    throw err
  })
}

export const proxy: RequestHandler = async (req, res, next) =>
  createProxyMiddleware({
    target: YA_API_BASE_URL,
    pathRewrite: { '/api': '' },
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
    logLevel: 'silent',
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async responseBuffer => {
      const user = getUserFromBuffer(responseBuffer)
      if (user) {
        insertUserInDbIfNotExists(user)
      }
      return responseBuffer
    }),
  })(req, res, next)
