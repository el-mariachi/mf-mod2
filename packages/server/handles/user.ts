import { Router } from 'express'
import { UserAPI } from '../api/UserAPI'
import { bodyValidator } from '../validators/bodyValidator'
import { paramsValidator } from '../validators/paramsValidator'
import {
  findUserValidations,
  createUserValidations,
  deleteUserValidations,
  setUserThemeValidations,
} from '../validators/userValidations'

export const userRoutes = (router: Router) => {
  const usersRouter = Router()
  usersRouter.get('/', UserAPI.findAll)

  const userRouter = Router()
  userRouter
    .get('/:id', paramsValidator(findUserValidations), UserAPI.find)
    .post(
      '/:id/theme',
      bodyValidator(setUserThemeValidations),
      UserAPI.setTheme
    )
    .post('/', bodyValidator(createUserValidations), UserAPI.create)
    .delete('/', bodyValidator(deleteUserValidations), UserAPI.delete)

  router.use('/users', usersRouter)
  router.use('/user', userRouter)
}
