import { FC, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import ForumTopic, { ForumTopicProps } from '@components/ForumTopic'
import { Button, Pagination } from 'react-bootstrap'
import avatar from '@images/king.png'
import './ForumTopicsList.scss'

const mockTopics: Omit<ForumTopicProps, 'mock2topic'>[] = [
  {
    author: 'Петр',
    avatar,
    title: 'Тема от Петра',
    dateCreate: new Date(2023, 0, 18, 12, 5),
    msgCount: 4,
    dateLastMsg: new Date(2023, 2, 10, 18, 45),
  },
  {
    author: 'Антон',
    avatar,
    title: 'Тема от Антона',
    dateCreate: new Date(2023, 2, 11, 18, 34),
  },
  {
    author: 'Стас',
    avatar,
    title: 'Тема от Стаса с более длиннным названием',
    dateCreate: new Date(2023, 2, 2, 10, 42),
  },
  {
    author: 'Настя',
    avatar,
    title: '!!!',
    dateCreate: new Date(2023, 1, 9, 13, 18),
  },
]

const mockActivePage = 2
const mockPagination: ReactNode[] = []
for (let number = 1; number <= 5; number++) {
  mockPagination.push(
    <Pagination.Item key={number} active={number === mockActivePage}>
      {number}
    </Pagination.Item>
  )
}

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
  return (
    <div className={classNames(cls, 'forum-topic-list')} {...attrs}>
      <div className="forum-topic-list__buttons d-flex justify-content-sm-end">
        <Button onClick={mock2addTopic}>Создать тему</Button>
      </div>
      <ul className="forum-topic-list__list d-flex flex-column mt-4 mt-sm-5">
        {mockTopics.map((topicProps, index) => (
          <li key={index} className="forum-topic-list__topic-container border">
            <ForumTopic
              onClick={mock2topic}
              className="forum-topic-list__topic"
              {...topicProps}
            />
          </li>
        ))}
      </ul>
      <Pagination className="forum-topic-list__pagination">
        {mockPagination}
      </Pagination>
    </div>
  )
}
export default ForumTopicsList
