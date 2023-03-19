import type { RequestHandler } from 'express'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'
import { YA_API_BASE_URL } from '../constants/api'
import { User } from '@models/User'
import { UserTheme } from '@db/models/UserTheme'

const getUserFromBuffer = (buffer: Buffer) => {
  try {
    const user = JSON.parse(buffer.toString())
    if ('reason' in user) {
      throw Error
    }
    return user
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
  })
    .then(([user]) => {
      UserTheme.findOrCreate({
        where: { user_id: user.yandex_id, theme_id: 1 },
      }).catch(err => {
        throw err
      })
    })
    .catch(err => {
      throw err
    })
}

export const proxy: RequestHandler = async (req, res, next) => {
  return createProxyMiddleware({
    target: YA_API_BASE_URL,
    pathRewrite: { '/api': '' },
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
    logLevel: 'debug',
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async responseBuffer => {
      if (req.url.endsWith('/auth/user')) {
        const user = getUserFromBuffer(responseBuffer)
        if (user) {
          try {
            insertUserInDbIfNotExists(user)
          } catch (err) {
            console.log('err', err)
          }
        }
      }

      return responseBuffer
    }),
  })(req, res, next)
}
