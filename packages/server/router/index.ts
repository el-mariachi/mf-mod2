import { Router } from 'express'
import { themeRoutes } from '@handles/theme'
import { userRoutes } from '@handles/user'

const router = Router()
themeRoutes(router)
userRoutes(router)
export default router
