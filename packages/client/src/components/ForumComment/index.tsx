import { FC, HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import AddForumCommentForm from '@components/AddForumCommentForm'
import Icon from '@components/Icon'
import ForumAvatar from '@components/ForumAvatar'
import { datePrettify } from '@utils/datePrettify'
import './ForumComment.scss'
import useForumUserIsOwner from '@hooks/useForumUserIsOwner'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { removeComment } from '@store/slices/forum'

export type ForumCommentProps = HTMLAttributes<HTMLDivElement> & {
  comment: TopicComment
  topic: Topic
}

const getRespondComment = (topic: Topic, parent_id: number) => {
  const respondComment = topic?.comments?.find(item => item.id === parent_id)
  if (respondComment) {
    return `@${respondComment?.user?.user_name} ${datePrettify(
      new Date(respondComment.created_at),
      true
    )}`
  }
}

const ForumComment: FC<ForumCommentProps> = ({
  comment,
  topic,
  className: cls,
  children: text = '',
  ...attrs
}) => {
  const { user, created_at, topic_id } = comment
  const { user_name, avatar } = user as ForumUser
  const isOwner = useForumUserIsOwner(user as ForumUser)
  const dateCreate = new Date(created_at)
  const respondTo = getRespondComment(topic, comment.parent_id as number)
  const [doResponse, setDoResponse] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const dispatch = useAppDispatch()

  const onEdit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setEditMode(true)
  }
  const onDelete = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(removeComment(comment))
  }

  useEffect(() => {
    setDoResponse(false)
    setEditMode(false)
  }, [topic])

  return (
    <div className={classNames(cls, 'forum-comment p-3 border')} {...attrs}>
      <div className="d-sm-flex align-items-start">
        <ForumAvatar
          image={avatar === null ? undefined : avatar}
          alt={`Аватар ${user_name}`}
          className="flex-grow-0 me-3 forum-comment__avatar"
        />
        <div>
          <div className="forum-comment__about mb-1">
            <span className="fw-bold m-0 forum-comment__author me-2">
              {user_name}
            </span>
            <span className="text-nowrap text-muted forum-comment__date-create">
              {datePrettify(dateCreate, true)}
            </span>
          </div>
          {respondTo ? (
            <div className="fst-italic forum-comment__respond">{respondTo}</div>
          ) : null}
          <div className="forum-comment__text">
            {
              /**  редактировать текущий кооментарий */
              editMode ? (
                <AddForumCommentForm comment={comment} topicId={topic_id} />
              ) : (
                <p className="p-0">{text}</p>
              )
            }
          </div>
        </div>
      </div>
      <div className="forum-comment-buttons d-flex justify-content-sm-end">
        {editMode ? (
          <Button size="sm" onClick={() => setEditMode(false)}>
            Не редактировать
          </Button>
        ) : isOwner ? (
          <div className="forum-comment__actions">
            <Button
              onClick={onEdit}
              variant="link"
              className="p-0 me-2 text-nowrap d-inline-flex align-items-center"
              title={`Редактировать комментарий`}>
              <Icon iconName="PencilFill" size={16} className="me-1" />
              <span className="">редактировать</span>
            </Button>
            <Button
              onClick={onDelete}
              variant="link"
              className="p-0 text-nowrap d-inline-flex align-items-center"
              title={`Удалить комментарий`}>
              <Icon iconName="TrashFill" size={16} className="me-1" />
              удалить
            </Button>
          </div>
        ) : (
          <Button size="sm" onClick={() => setDoResponse(!doResponse)}>
            {doResponse ? 'Не отвечать' : 'Ответить'}
          </Button>
        )}
      </div>
      {/** Добавить комментарий к текущему комментарию*/}
      <AddForumCommentForm
        topicId={topic_id}
        parentId={comment.id}
        className={classNames('forum-comment__add-form mt-3', {
          'd-none': !doResponse,
        })}
      />
    </div>
  )
}
export default ForumComment
