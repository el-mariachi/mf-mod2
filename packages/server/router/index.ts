import { Router } from 'express'
import { themeRoutes } from '@handles/theme'
import { userRoutes } from '@handles/user'
import { TopicApi } from '../api/Topic'
import { CommentApi } from '../api/Comment'
import { proxy } from '../middleware/proxy'

const router = Router()
themeRoutes(router)
userRoutes(router)

router.use('/topic', TopicApi)
router.use('/comment', CommentApi)
/** все остальные запросы будут проксированы на ya-praktikum.tech  */
router.use('/', proxy)

export default router
