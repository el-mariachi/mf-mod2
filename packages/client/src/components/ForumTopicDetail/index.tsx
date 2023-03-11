import { FC, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import ForumCommentsList from '@components/ForumCommentsList'
import AddForumCommentForm from '@components/AddForumCommentForm'
import { datePrettify } from '@utils/datePrettify'
import dummyAvatarImg from '@images/king.png'
import './ForumTopicDetail.scss'

export type ForumTopicDetailProps = HTMLAttributes<HTMLDivElement> & {
  author: string
  avatar?: string
  title: string
  dateCreate: Date
  msgCount?: number
  dateLastMsg?: Date
  mock2list: () => void
}
const ForumTopicDetail: FC<ForumTopicDetailProps> = ({
  author,
  avatar,
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

  return (
    <div className={classNames(cls, 'forum-topic-detail ')} {...attrs}>
      <div className="forum-topic-detail__topic p-3 border mb-3">
        <div className="d-flex align-items-center mb-3 forum-topic-detail__topic-header">
          <div className="flex-grow-0 me-4 forum-topic-detail__avatar">
            <img
              className="rounded-circle flex-2 d-inline-block border border-2 p-1 forum-topic-detail__avatar"
              src={avatar ? avatar : dummyAvatarImg}
            />
          </div>
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
          <Button className="me-2" onClick={() => setDoResponse(!doResponse)}>
            {doResponse ? 'Не отвечать' : 'Ответить'}
          </Button>
          <Button variant="secondary" onClick={mock2list}>
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
