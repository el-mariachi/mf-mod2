import { Topic } from '../db/models/Topic'
import { User } from '../db/models/User'
import { type Request, type Response, Router } from 'express'
import { checkAuthMiddleware } from '../middleware/checkAuth'

export const TopicApi = Router()

TopicApi.get('/:id', (req: Request, res: Response) => {
  Topic.findByPk(req.params.id, { include: [{ model: User }] }).then(topic =>
    topic
      ? res.status(200).json(topic)
      : res.status(404).json({ type: 'error', message: 'Topic not found' })
  )
})

TopicApi.get('/', checkAuthMiddleware, (_: Request, res: Response) => {
  Topic.findAll({ include: [{ model: User }] })
    .then(topic => res.status(200).json(topic))
    .catch(err => res.status(500).end(err.message))
})

TopicApi.post('/', checkAuthMiddleware, (req: Request, res: Response) => {
  req.body.user_id = res.locals.user.id
  Topic.create(req.body, { include: [{ model: User }] })
    .then(topic =>
      Topic.findByPk(topic.id, { include: [{ model: User }] }).then($topic =>
        res.status(201).send($topic)
      )
    )
    .catch(err => res.status(500).send(err.message))
})

TopicApi.put('/:id', checkAuthMiddleware, (req: Request, res: Response) => {
  Topic.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then(result => {
      const [count, topics] = result
      if (count === 0) {
        res.status(404).json({ type: 'error', message: 'Topic not found' })
      } else {
        res.status(200).json(topics[0])
      }
    })
    .catch(err => res.status(500).end(err.message))
})

TopicApi.delete('/:id', checkAuthMiddleware, (req: Request, res: Response) => {
  Topic.destroy({ where: { id: req.params.id } })
    .then(topic => res.status(201).json(topic))
    .catch(err => res.status(500).end(err.message))
})
