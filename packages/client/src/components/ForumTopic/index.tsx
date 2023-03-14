import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import Icon from '@components/Icon'
import ForumAvatar from '@components/ForumAvatar'
import { datePrettify } from '@utils/datePrettify'
import './ForumTopic.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { removeTopic } from '@store/slices/forum'

export type ForumTopicProps = HTMLAttributes<HTMLDivElement> & {
  author: string
  avatar?: string
  isOwner?: boolean
  title: string
  dateCreate: Date
  msgCount?: number
  dateLastMsg?: Date
  mock2topic: () => void
}
const ForumTopic: FC<ForumTopicProps> = ({
  author,
  avatar,
  isOwner = false,
  title,
  dateCreate,
  msgCount,
  dateLastMsg,
  mock2topic,
  className: cls,
  ...attrs
}) => {
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
    <div
      className={classNames(
        cls,
        'forum-topic p-3 d-sm-flex align-items-center'
      )}
      {...attrs}>
      <ForumAvatar
        image={avatar}
        alt={`Аватар ${author}`}
        title={`Перейти к топику ${title}`}
        onClick={mock2topic}
        className="flex-grow-0 me-3 interactive forum-topic__avatar"
      />
      <div className="flex-grow-1 me-3 forum-topic__about">
        <p className="fw-bold m-0 forum-topic__title">
          <span
            className="interactive"
            onClick={mock2topic}
            title={`Перейти к топику ${title}`}>
            {title}
          </span>
        </p>
        {isOwner ? (
          <div className="forum-topic__actions">
            <Button
              onClick={onEdit}
              variant="link"
              className="p-0 me-2 text-nowrap d-inline-flex align-items-center"
              title={`Редактировать тему ${title}`}>
              <Icon iconName="PencilFill" size={16} className="me-1" />
              <span className="">редактировать</span>
            </Button>
            <Button
              onClick={onDelete}
              variant="link"
              className="p-0 text-nowrap d-inline-flex align-items-center"
              title={`Удалить тему ${title}`}>
              <Icon iconName="TrashFill" size={16} className="me-1" />
              удалить
            </Button>
          </div>
        ) : null}
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
