import { FC, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import AddForumCommentForm from '@components/AddForumCommentForm'
import { datePrettify } from '@utils/datePrettify'
import dummyAvatarImg from '@images/king.png'
import './ForumComment.scss'

export type ForumCommentProps = HTMLAttributes<HTMLDivElement> & {
  author: string
  avatar?: string
  dateCreate: Date
  respondTo?: string
}
const ForumComment: FC<ForumCommentProps> = ({
  author,
  avatar,
  dateCreate,
  respondTo,
  className: cls,
  children: text,
  ...attrs
}) => {
  const [doResponse, setDoResponse] = useState(false)

  return (
    <div className={classNames(cls, 'forum-comment p-3 border')} {...attrs}>
      <div className="d-sm-flex align-items-start">
        <div className="flex-grow-0 me-3 forum-comment__avatar">
          <img
            className="rounded-circle flex-2 d-inline-block border border-2 p-1 forum-comment__avatar"
            src={avatar ? avatar : dummyAvatarImg}
          />
        </div>
        <div>
          <div className="forum-comment__about mb-1">
            <span className="fw-bold m-0 forum-comment__author me-2">
              {author}
            </span>
            <span className="text-nowrap text-muted forum-comment__date-create">
              {datePrettify(dateCreate, true)}
            </span>
          </div>
          {respondTo ? (
            <div className="fst-italic forum-comment__respond">{respondTo}</div>
          ) : null}
          <div className="forum-comment__text">
            <p className="p-0">{text}</p>
          </div>
        </div>
      </div>
      <div className="forum-comment-buttons d-flex justify-content-sm-end">
        <Button size="sm" onClick={() => setDoResponse(!doResponse)}>
          {doResponse ? 'Не отвечать' : 'Ответить'}
        </Button>
      </div>
      <AddForumCommentForm
        respondTo={`@${author}${datePrettify(dateCreate, true)}`}
        className={classNames('forum-comment__add-form mt-3', {
          'd-none': !doResponse,
        })}
      />
    </div>
  )
}
export default ForumComment
