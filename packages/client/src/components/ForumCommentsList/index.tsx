import { FC, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Pagination } from 'react-bootstrap'
import ForumComment, { ForumCommentProps } from '@components/ForumComment'
import { datePrettify } from '@utils/datePrettify'
import avatar from '@images/king.png'
import './ForumCommentsList.scss'

type MockForumCommentProps = ForumCommentProps & {
  text: string
}
const mockComments: MockForumCommentProps[] = [
  {
    author: 'Петр',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    dateCreate: new Date(2023, 0, 18, 14, 33),
    avatar,
  },
  {
    author: 'Антон',
    text: 'Lorem ipsum.',
    dateCreate: new Date(2023, 1, 8, 17, 58),
    avatar,
  },
  {
    author: 'Стас',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    dateCreate: new Date(2023, 1, 27, 6, 17),
    avatar,
  },
  {
    author: 'Настя',
    respondTo: `@Стас ${datePrettify(new Date(2023, 1, 27, 6, 17), true)}`,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    dateCreate: new Date(2023, 2, 10, 18, 45),
    avatar,
  },
]
const mockActivePage = 3
const mockPagination: ReactNode[] = []
for (let number = 1; number <= 3; number++) {
  mockPagination.push(
    <Pagination.Item key={number} active={number === mockActivePage}>
      {number}
    </Pagination.Item>
  )
}

export type ForumCommentsListProps = HTMLAttributes<HTMLDivElement> & {
  // ...
}
const ForumCommentsList: FC<ForumCommentsListProps> = ({
  className: cls,
  ...attrs
}) => {
  return (
    <div className={classNames(cls, 'forum-comments-list')} {...attrs}>
      <ul className="forum-comments-list__list d-flex flex-column mb-3">
        {mockComments.map(({ text, ...commentProps }, index) => (
          <li key={index} className="forum-comments-list__comment">
            <ForumComment {...commentProps}>{text}</ForumComment>
          </li>
        ))}
      </ul>
      <Pagination className="forum-comments-list__pagination">
        {mockPagination}
      </Pagination>
    </div>
  )
}
export default ForumCommentsList
