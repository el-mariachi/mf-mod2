import { IForumTopicProps } from './ForumTopicProps'
import './ForumTopic.scss'

function ForumTopic({ topicAuthor, topicTitle }: IForumTopicProps) {
  return (
    <li className="topic__container border d-flex align-items-center justify-content-between">
      <div className="topic__left-block d-flex">
        <img
          className="topic__avatar"
          src="https://oir.mobi/uploads/posts/2021-03/thumbs/1616429741_57-p-kartinki-goluboi-fon-62.jpg"
        />
        <div className="topic__data">
          <p className="topic__title">{topicTitle}</p>
          <p className="topic__author">Автор: {topicAuthor}</p>
        </div>
      </div>
    </li>
  )
}

export default ForumTopic
