import { Topic } from '../db/models/Topic'
import { type Request, type Response, Router } from 'express'
import { checkAuthMiddleware } from '../middleware/checkAuth'

export const TopicApi = Router()

TopicApi.get('/:id', (req: Request, res: Response) => {
  Topic.findByPk(req.params.id).then(topic =>
    topic
      ? res.status(200).json(topic)
      : res.status(400).json({ type: 'error', message: 'Topic not found' })
  )
})

TopicApi.get('/', (_: Request, res: Response) => {
  console.log('topic')
  Topic.findAll().then(topic => res.status(200).json(topic))
})

TopicApi.post('/', (req: Request, res: Response) => {
  req.body.user_id = res.locals.user.id
  Topic.create(req.body).then(topic => res.status(201).send({ id: topic.id }))
})


TopicApi.put('/:id', (req: Request, res: Response) => {
  Topic.update(req.body, {
    where: { id: req.params.id, user_id: res.locals.user.id },
    returning: true,
  })
    .then(result => {
      const [count, topics] = result
      if (count === 0) {
        throw Error('Топик не найден')
      }
      res.status(200).json(topics[0])
    })
})

TopicApi.delete('/:id', (req: Request, res: Response, next) => {
    Topic.destroy({ where: { id: req.params.id, user_id: res.locals.user.id } })
      .then(topic => res.status(201).json(topic))
      .catch(next)
})
