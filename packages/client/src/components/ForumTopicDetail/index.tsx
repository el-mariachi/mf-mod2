import { FC, HTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import dummyAvatarImg from '@images/king.png'
import './ForumTopicDetail.scss'
import ForumCommentsList from '@components/ForumCommentsList'

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
  return (
    <>
      <div className="forum-topic__container border d-flex align-items-center justify-content-between">
        <div className="forum-topic__left-block d-flex align-items-center">
          <img
            className="rounded-circle flex-2 d-inline-block border border-2 p-1 forum-topic__avatar"
            src={avatar ? avatar : dummyAvatarImg}
          />
          <div className="forum-topic__data">
            <p className="forum-topic__title fw-bold">{title}</p>
            <p className="forum-topic__author">Автор: {author}</p>
          </div>
          <div>Собощений: {msgCount}</div>
          {dateLastMsg ? <div>Последнее: {dateLastMsg.getDate()}</div> : null}
          <div>Создан:{dateCreate.getDate()}</div>
        </div>
        {text}
      </div>
      <Button>Ответить</Button>
      <Button onClick={mock2list}>Назад, к списку</Button>
      <ForumCommentsList />
    </>
  )
}
export default ForumTopicDetail
