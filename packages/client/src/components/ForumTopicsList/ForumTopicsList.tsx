import ForumTopic from '../ForumTopic/ForumTopic'
import './ForumTopicsList.scss'
function ForumTopicsList() {
  return (
    <ul className="topic-list d-flex flex-column">
      <ForumTopic topicAuthor="Петр" topicTitle="Тема от Петра" />
      <ForumTopic topicAuthor="Антон" topicTitle="Тема от Антона" />
      <ForumTopic topicAuthor="Стас" topicTitle="Tema от Стаса" />
    </ul>
  )
}

export default ForumTopicsList
