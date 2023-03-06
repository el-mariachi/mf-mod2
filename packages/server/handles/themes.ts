import { Router } from 'express'
import { ThemeAPI } from '../api/ThemeAPI'
import { validator } from '../validators/validator'
import { createThemeValidations } from '../validators/themeValidations'

export const themesRoutes = (router: Router) => {
  const themesRouter = Router()
  themesRouter.get('/', ThemeAPI.findAll)

  const themeRouter = Router()
  themeRouter.post('/', validator(createThemeValidations), ThemeAPI.create)

  router.use('/themes', themesRouter)
  router.use('/theme', themeRouter)
}
