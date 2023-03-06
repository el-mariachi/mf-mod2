import { TopicApi } from '../api/Topic'
import { Router } from 'express'
import { proxy } from '../middleware/proxy'

const apiRouter = Router()

apiRouter.use('/yandex', proxy)
apiRouter.use('/topic', TopicApi)

export default apiRouter
