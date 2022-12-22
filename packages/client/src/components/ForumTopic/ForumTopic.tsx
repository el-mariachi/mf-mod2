import { IForumTopicProps } from './ForumTopicProps'

function ForumTopic({ topicAuthor, topicTitle }: IForumTopicProps) {
  return (
    <li>
      <h3>{topicAuthor}</h3>
      <p>{topicTitle}</p>
    </li>
  )
}

export default ForumTopic
