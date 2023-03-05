import { Router } from 'express'

export const themesRoutes = (router: Router) => {
  const themesRouter = Router()

  themesRouter.post('/', () => ({})).get('/', () => ({}))

  router.use('/theme', themesRouter)
}
