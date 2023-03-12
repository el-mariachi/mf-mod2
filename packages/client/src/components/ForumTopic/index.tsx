import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import ForumAvatar from '@components/ForumAvatar'
import { datePrettify } from '@utils/datePrettify'
import './ForumTopic.scss'

export type ForumTopicProps = HTMLAttributes<HTMLDivElement> & {
  author: string
  avatar?: string
  title: string
  dateCreate: Date
  msgCount?: number
  dateLastMsg?: Date
}
const ForumTopic: FC<ForumTopicProps> = ({
  author,
  avatar,
  title,
  dateCreate,
  msgCount,
  dateLastMsg,
  className: cls,
  ...attrs
}) => {
  return (
    <div
      className={classNames(
        cls,
        'forum-topic p-3 d-sm-flex align-items-center'
      )}
      {...attrs}>
      <ForumAvatar
        image={avatar}
        title={`Аватар ${author}`}
        className="flex-grow-0 me-3 forum-topic__avatar"
      />
      <div className="flex-grow-1 me-3 forum-topic__about">
        <p className="fw-bold m-0 forum-topic__title">{title}</p>
      </div>
      <div className="flex-grow-0 me-1 lh-sm text-muted forum-topic__created">
        <p className="m-0">
          Автор: <span className="text-truncate">{author}</span>
        </p>
        <p className="m-0">
          Создана:{' '}
          <span className="text-nowrap">{datePrettify(dateCreate)}</span>
        </p>
      </div>
      <div className="flex-grow-0 lh-sm text-muted forum-topic__messages">
        <p className="m-0">
          Сообщений:{' '}
          {msgCount ? msgCount : <span className="text-nowrap">пока нет</span>}
        </p>
        {msgCount && dateLastMsg ? (
          <p className="m-0">
            Последнее:{' '}
            <span className="text-nowrap">{datePrettify(dateLastMsg)}</span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
export default ForumTopic
