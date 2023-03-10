import { FC, HTMLAttributes } from 'react'
import ForumTopic, { ForumTopicProps } from '@components/ForumTopic'
import { Button } from 'react-bootstrap'
import './ForumTopicsList.scss'

const mockTopics: Omit<ForumTopicProps, 'mock2topic'>[] = [
  {
    author: 'Петр',
    title: 'Тема от Петра',
    dateCreate: new Date(),
    msgCount: 6,   
    dateLastMsg: new Date(),
  },
  {
    author: 'Антон',
    title: 'Тема от Антона',
    dateCreate: new Date(),
  },
  {
    author: 'Стас',
    title: 'Тема от Стаса',
    dateCreate: new Date(),
  },
  {
    author: 'Настя',
    title: 'Тема от Насти',
    dateCreate: new Date(),
  },
]

export type ForumTopicsListProps = HTMLAttributes<HTMLDivElement> & {
  mock2addTopic: () => void
  mock2topic: () => void
}
const ForumTopicsList: FC<ForumTopicsListProps> = ({ 
  mock2addTopic,
  mock2topic,
  className: cls,
  ...attrs 
}) => {     
  return (<>
    <Button onClick={mock2addTopic}>Создать тему</Button>
    <ul className="forum-topic-list d-flex flex-column">
      {mockTopics.map((topicProps, index) => (
        <ForumTopic
          key={index}
          onClick={mock2topic}
          {...topicProps}
        />
      ))}
    </ul>
  </>)
}
export default ForumTopicsList
