import { TopicApi } from '../api/Topic'
import { Router } from 'express'
import { proxy } from '../middleware/proxy'

const apiRouter = Router()

apiRouter.use('/topic', TopicApi)
/** все остальные запросы будут проксированы на ya-praktikum.tech  */
apiRouter.use('/', proxy)

export default apiRouter
