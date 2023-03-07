import { Router } from 'express'
import { themesRoutes } from '../handles/themes'
import { userRoutes } from '../handles/user'

const router = Router()
themesRoutes(router)
userRoutes(router)
export default router
