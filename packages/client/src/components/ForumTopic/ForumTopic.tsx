import { IForumTopicProps } from './ForumTopicProps'
import Button from 'react-bootstrap/Button'
import './ForumTopic.scss'

function ForumTopic({ topicAuthor, topicTitle }: IForumTopicProps) {
  return (
    <li className="topic__container border d-flex align-items-center justify-content-between">
      <div className="topic__left-block d-flex align-items-center">
        <img
          className="rounded-circle flex-2 d-inline-block border border-2 p-1 topic__avatar"
          src="https://oir.mobi/uploads/posts/2021-03/thumbs/1616429741_57-p-kartinki-goluboi-fon-62.jpg"
        />
        <div className="topic__data">
          <p className="topic__title fw-bold">{topicTitle}</p>
          <p className="topic__author">Автор: {topicAuthor}</p>
        </div>
      </div>
      <Button variant="secondary">Удалить тему</Button>
    </li>
  )
}

export default ForumTopic
