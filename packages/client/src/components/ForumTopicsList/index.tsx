import ForumTopic, { ForumTopicProps } from '@components/ForumTopic'
import './ForumTopicsList.scss'
const topics: ForumTopicProps[] = [
  {
    topicAuthor: 'Петр',
    topicTitle: 'Тема от Петра',
  },
  {
    topicAuthor: 'Антон',
    topicTitle: 'Тема от Антона',
  },
  {
    topicAuthor: 'Стас',
    topicTitle: 'Тема от Стаса',
  },
  {
    topicAuthor: 'Настя',
    topicTitle: 'Тема от Насти',
  },
]

function ForumTopicsList() {
  return (
    <ul className="forum-topic-list d-flex flex-column">
      {topics.map((topic, index) => (
        <ForumTopic
          key={index}
          topicAuthor={topic.topicAuthor}
          topicTitle={topic.topicTitle}
        />
      ))}
    </ul>
  )
}

export default ForumTopicsList
