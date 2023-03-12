import { FC, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import ForumCommentsList from '@components/ForumCommentsList'
import AddForumCommentForm from '@components/AddForumCommentForm'
import Icon from '@components/Icon'
import ForumAvatar from '@components/ForumAvatar'
import { datePrettify } from '@utils/datePrettify'
import './ForumTopicDetail.scss'

export type ForumTopicDetailProps = HTMLAttributes<HTMLDivElement> & {
  author: string
  avatar?: string
  isOwner?: boolean
  title: string
  dateCreate: Date
  msgCount?: number
  dateLastMsg?: Date
  mock2list: () => void
}
const ForumTopicDetail: FC<ForumTopicDetailProps> = ({
  author,
  avatar,
  isOwner = false,
  title,
  dateCreate,
  msgCount,
  dateLastMsg,
  mock2list,
  className: cls,
  children: text,
  ...attrs
}) => {
  const [doResponse, setDoResponse] = useState(false)

  const onEdit = (e: React.SyntheticEvent) => {
    // TODO
    e.preventDefault()
    console.log('edit topic')
  }
  const onDelete = (e: React.SyntheticEvent) => {
    // TODO
    e.preventDefault()
    console.log('delete topic')
  }

  return (
    <div className={classNames(cls, 'forum-topic-detail')} {...attrs}>
      <div className="forum-topic-detail__topic p-3 border mb-3">
        <div className="d-flex align-items-center mb-3 forum-topic-detail__topic-header">
          <ForumAvatar
            image={avatar}
            size="large"
            title={`Аватар ${author}`}
            className="flex-grow-0 me-4 forum-topic-detail__avatar"
          />
          <div className="forum-topic-detail__about">
            <h2 className="h4 fw-light mb-3">{title}</h2>
            <div className="d-flex align-items-center">
              <div className="me-4 lh-sm text-muted forum-topic-detail__created">
                <p className="m-0">
                  Автор: <span className="text-truncate">{author}</span>
                </p>
                <p className="m-0">
                  Создана:{' '}
                  <span className="text-nowrap">
                    {datePrettify(dateCreate, true)}
                  </span>
                </p>
              </div>
              <div className="lh-sm text-muted forum-topic-detail__messages">
                <p className="m-0">
                  Сообщений:{' '}
                  {msgCount ? (
                    msgCount
                  ) : (
                    <span className="text-nowrap">пока нет</span>
                  )}
                </p>
                {msgCount && dateLastMsg ? (
                  <p className="m-0">
                    Последнее:{' '}
                    <span className="text-nowrap">
                      {datePrettify(dateLastMsg, true)}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="forum-topic-detail__text mb-3">{text}</div>
        <div className="forum-topic-detail__topic-buttons d-flex justify-content-sm-end">
          {isOwner ? (
            <div className="forum-topic__actions">
              <Button
                onClick={onEdit}
                className="mt-1 me-2 d-inline-flex align-items-center"
                title={`Редактировать тему ${title}`}>
                <Icon iconName="PencilFill" size={18} className="me-1" />
                <span className="fs-6">редактировать</span>
              </Button>
              <Button
                onClick={onDelete}
                className="mt-1 me-2 d-inline-flex align-items-center"
                title={`Удалить тему ${title}`}>
                <Icon iconName="TrashFill" size={18} className="me-1" />
                <span className="fs-6">удалить</span>
              </Button>
            </div>
          ) : (
            <Button
              className="mt-1 me-2"
              onClick={() => setDoResponse(!doResponse)}>
              {doResponse ? 'Не отвечать' : 'Ответить'}
            </Button>
          )}
          <Button variant="secondary" className="mt-1" onClick={mock2list}>
            Назад, к списку
          </Button>
        </div>
        <AddForumCommentForm
          className={classNames('forum-topic-detail__add-form mt-3', {
            'd-none': !doResponse,
          })}
        />
      </div>
      <ForumCommentsList className="forum-topic-detail__comments" />
    </div>
  )
}
export default ForumTopicDetail
