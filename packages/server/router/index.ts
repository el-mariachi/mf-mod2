import { Router } from 'express'
import { themesRoutes } from '../handles/themes'

const router = Router()
themesRoutes(router)
export default router
