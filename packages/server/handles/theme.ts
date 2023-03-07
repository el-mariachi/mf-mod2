import { Router } from 'express'
import { ThemeAPI } from '../api/ThemeAPI'
import { bodyValidator } from '../validators/bodyValidator'
import { paramsValidator } from '../validators/paramsValidator'
import {
  findThemeValidations,
  createThemeValidations,
  deleteThemeValidations,
} from '../validators/themeValidations'

export const themeRoutes = (router: Router) => {
  const themesRouter = Router()
  themesRouter.get('/', ThemeAPI.findAll)

  const themeRouter = Router()
  themeRouter
    .get('/:id', paramsValidator(findThemeValidations), ThemeAPI.find)
    .post('/', bodyValidator(createThemeValidations), ThemeAPI.create)
    .delete('/', bodyValidator(deleteThemeValidations), ThemeAPI.delete)

  router.use('/themes', themesRouter)
  router.use('/theme', themeRouter)
}
