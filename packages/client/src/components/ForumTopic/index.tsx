import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import ForumAvatar from '@components/ForumAvatar'
import { datePrettify } from '@utils/datePrettify'
import './ForumTopic.scss'

export type ForumTopicProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & Topic
const ForumTopic: FC<ForumTopicProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  user,
  title,
  created_at,
  updated_at,
  cmnt_count,
  className: cls,
  ...attrs
}) => {
  const { avatar, user_name } = user || {}
  const msgCount = cmnt_count
  const dateCreate = new Date(created_at)
  const dateLastMsg = new Date(updated_at)

  return (
    <div
      className={classNames(
        cls,
        'forum-topic p-3 d-sm-flex align-items-center'
      )}
      {...attrs}>
      <ForumAvatar
        image={avatar === null ? undefined : avatar}
        alt={`Аватар ${user_name}`}
        title={`Перейти к топику ${title}`}
        onClick={() => ''}
        className="flex-grow-0 me-3 interactive forum-topic__avatar"
      />
      <div className="flex-grow-1 me-3 forum-topic__about">
        <p className="fw-bold m-0 forum-topic__title">
          <span
            className="interactive"
            onClick={() => ''}
            title={`Перейти к топику ${title}`}>
            {title}
          </span>
        </p>
      </div>
      <div className="flex-grow-0 me-1 lh-sm text-muted forum-topic__created">
        <p className="m-0">
          Автор: <span className="text-truncate">{user_name}</span>
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
