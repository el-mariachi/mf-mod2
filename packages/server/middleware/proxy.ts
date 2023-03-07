import type { RequestHandler } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { YA_API_BASE_URL } from '../constants/api'

export const proxy: RequestHandler = async (req, res, next) =>
  createProxyMiddleware({
    target: YA_API_BASE_URL,
    pathRewrite: { '/api': '' },
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
    logLevel: 'silent',
    selfHandleResponse: false,
  })(req, res, next)
