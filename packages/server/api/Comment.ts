import { Comment } from '../db/models/Comment'
import { User } from '../db/models/User'
import { type Request, type Response, Router } from 'express'
import { checkAuthMiddleware } from '../middleware/checkAuth'

export const CommentApi = Router()

CommentApi.get('/:id', (req: Request, res: Response) => {
  Comment.findByPk(req.params.id, { include: [{ model: User }] }).then(
    comment =>
      comment
        ? res.status(200).json(comment)
        : res.status(404).end('Comment not found')
  )
})

CommentApi.get('/', checkAuthMiddleware, (req: Request, res: Response) => {
  const { topic_id } = req.query
  Comment.findAll({
    where: { topic_id },
    include: [{ model: User }],
  })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).end(err.message))
})

CommentApi.post('/', checkAuthMiddleware, (req: Request, res: Response) => {
  req.body.user_id = res.locals.user.id
  Comment.create(req.body)
    .then(comment => {
      Comment.findByPk(comment.id, { include: [{ model: User }] }).then(
        $comment => res.status(201).send($comment)
      )
    })
    .catch(err => res.status(500).end(err.message))
})

CommentApi.put('/:id', checkAuthMiddleware, (req: Request, res: Response) => {
  Comment.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then(result => {
      const [count, comments] = result
      if (count === 0) {
        res.status(404).end('Comment not found') 
      } else {
        res.status(200).json(comments[0])
      }
    })
    .catch(err => res.status(500).end(err.message))
})

CommentApi.delete(
  '/:id',
  checkAuthMiddleware,
  (req: Request, res: Response) => {
    Comment.destroy({ where: { id: req.params.id } })
      .then(comment => res.status(201).json(comment))
      .catch(err => res.status(500).end(err.message))
  }
)
