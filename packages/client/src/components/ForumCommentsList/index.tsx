import { FC, HTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import ForumComment, { ForumCommentProps } from '@components/ForumComment'
import AddForumCommentForm from '@components/AddForumCommentForm'
import './ForumCommentsList.scss'

type MockForumCommentProps = ForumCommentProps & {
  text:string
}
const mockComments: MockForumCommentProps[] = [
  {
    author: 'Петр',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    dateCreate: new Date(),
  },
  {
    author: 'Антон',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    dateCreate: new Date(),
  },
  {
    author: 'Стас',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    dateCreate: new Date(),
  },
  {
    author: 'Настя',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    dateCreate: new Date(),
  },
]

export type ForumCommentsListProps = HTMLAttributes<HTMLDivElement> & {
  // ... 
}
const ForumCommentsList: FC<ForumCommentsListProps> = ({ 
  className: cls,
  ...attrs 
}) => {     
  return (<>
    <ul className="forum-topic-list d-flex flex-column">
      {mockComments.map(({text, ...commentProps}, index) => (
        <ForumComment key={index} {...commentProps}>{text}</ForumComment>
      ))}
    </ul>
    <AddForumCommentForm />
  </>)
}
export default ForumCommentsList
