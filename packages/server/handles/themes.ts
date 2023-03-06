import { Router } from 'express'
import { ThemeAPI } from '../api/ThemeAPI'

export const themesRoutes = (router: Router) => {
  const themesRouter = Router()

  themesRouter.post('/', () => ({})).get('/', ThemeAPI.findAll)

  router.use('/theme', themesRouter)
}
