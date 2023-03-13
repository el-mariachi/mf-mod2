import './ForumTopic.scss'
import { Button } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { removeTopic } from '@store/slices/forum'

export type ForumTopicProps = {
  topic: Topic
}

function ForumTopic({ topic }: ForumTopicProps) {
  const { title, user } = topic
  const dispatch = useAppDispatch()

  const onRemove = () => dispatch(removeTopic(topic))

  return (
    <li className="forum-topic__container border d-flex align-items-center justify-content-between">
      <div className="forum-topic__left-block d-flex align-items-center">
        <img
          className="rounded-circle flex-2 d-inline-block border border-2 p-1 forum-topic__avatar"
          src="https://oir.mobi/uploads/posts/2021-03/thumbs/1616429741_57-p-kartinki-goluboi-fon-62.jpg"
        />
        <div className="forum-topic__data">
          <p className="forum-topic__title fw-bold">{title}</p>
          <p className="forum-topic__author">Автор: {user.user_name}</p>
        </div>
      </div>
      <Button variant="secondary" onClick={onRemove}>
        Удалить тему
      </Button>
    </li>
  )
}

export default ForumTopic
