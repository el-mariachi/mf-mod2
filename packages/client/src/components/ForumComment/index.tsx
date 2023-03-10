import { FC, HTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import dummyAvatarImg from '@images/king.png'
import './ForumComment.scss'

export type ForumCommentProps = HTMLAttributes<HTMLDivElement> & {
  author: string
  avatar?: string
  dateCreate: Date
}
const ForumComment: FC<ForumCommentProps> = ({ 
  // TODO author name, avatar...
  author, 
  avatar,
  dateCreate,
  className: cls,
  children: text,
  ...attrs 
}) => {  
  return (
    <li className="forum-topic__container border d-flex align-items-center justify-content-between">
      <div className="forum-topic__left-block d-flex align-items-center">
        <img
          className="rounded-circle flex-2 d-inline-block border border-2 p-1 forum-topic__avatar"
          src={avatar ? avatar : dummyAvatarImg}
        />
        <div className="forum-topic__data">
          <p className="forum-topic__title fw-bold">{author}</p>
          <p className="forum-topic__author">{dateCreate.getDate()}</p>
          <p className="forum-topic__author">{text}</p>
        </div>
      </div>
      <Button>Ответить</Button>
    </li>
  )
}
export default ForumComment
