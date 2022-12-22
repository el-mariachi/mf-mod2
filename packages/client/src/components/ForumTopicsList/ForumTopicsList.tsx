import ForumTopic from '../ForumTopic/ForumTopic'

function ForumTopicsList() {
  return (
    <ul>
      <ForumTopic topicAuthor="Петр" topicTitle="Тема от Петра" />
      <ForumTopic topicAuthor="Антон" topicTitle="Тема от Антона" />
      <ForumTopic topicAuthor="Стас" topicTitle="Tema от Стаса" />
    </ul>
  )
}

export default ForumTopicsList
