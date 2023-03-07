import { Router } from 'express'
import { UserAPI } from '../api/UserAPI'
import { validator } from '../validators/validator'
import {
  createUserValidations,
  deleteUserValidations,
} from '../validators/userValidations'

export const userRoutes = (router: Router) => {
  const usersRouter = Router()
  usersRouter.get('/', UserAPI.findAll)

  const userRouter = Router()
  userRouter
    .get('/:id', UserAPI.find)
    .post('/', validator(createUserValidations), UserAPI.create)
    .delete('/', validator(deleteUserValidations), UserAPI.delete)

  router.use('/users', usersRouter)
  router.use('/user', userRouter)
}
