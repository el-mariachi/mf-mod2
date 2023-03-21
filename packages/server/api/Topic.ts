import { Topic } from '../db/models/Topic'
import { Comment } from '../db/models/Comment'
import { User } from '../db/models/User'
import { type Request, type Response, Router } from 'express'
import { checkAuthMiddleware } from '../middleware/checkAuth'
import { sequelize } from '@db/init'

export const TopicApi = Router()

TopicApi.get('/:id', (req: Request, res: Response) => {
  Topic.findByPk(req.params.id, {
    attributes: {
      include: [
        [
          sequelize.cast(
            sequelize.fn('COUNT', sequelize.col('comments.id')),
            'int'
          ),
          'cmnt_count',
        ],
      ],
    },
    include: [
      { model: User },
      {
        model: Comment,
        attributes: [],
        duplicating: false,
      },
    ],
    group: ['Topic.id', 'user.yandex_id'],
  }).then(topic =>
    topic
      ? res.status(200).json(topic)
      : res.status(404).json({ type: 'error', message: 'Topic not found' })
  )
})

TopicApi.get('/', (req: Request, res: Response) => {
  const { page = 1 } = req.query
  Topic.findAndCountAll({
    attributes: {
      include: [
        [
          sequelize.cast(
            sequelize.fn('COUNT', sequelize.col('comments.id')),
            'int'
          ),
          'cmnt_count',
        ],
      ],
    },
    include: [
      { model: User },
      {
        model: Comment,
        attributes: [],
        duplicating: false,
      },
    ],
    offset: (+page - 1) * 10,
    limit: 10,
    group: ['Topic.id', 'user.yandex_id'],
  })
    .then(response => {
      const data = response
      if (data.count && data.count.length) {
        res.status(200).json({ count: data.count.length, rows: data.rows })
      } else {
        throw Error('topic count error')
      }
    })
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
      const [count] = result
      if (count === 0) {
        res.status(404).json({ type: 'error', message: 'Topic not found' })
      } else {
        res.status(200).json(1)
      }
    })
    .catch(err => res.status(500).end(err.message))
})

TopicApi.delete('/:id', checkAuthMiddleware, (req: Request, res: Response) => {
  Topic.destroy({ where: { id: req.params.id } })
    .then(topic => res.status(200).json(topic))
    .catch(err => res.status(500).end(err.message))
})
