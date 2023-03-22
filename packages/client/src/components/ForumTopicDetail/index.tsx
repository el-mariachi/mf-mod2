import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import ForumCommentsList from '@components/ForumCommentsList'
import AddForumCommentForm from '@components/AddForumCommentForm'
import Icon from '@components/Icon'
import ForumAvatar from '@components/ForumAvatar'
import { datePrettify } from '@utils/datePrettify'
import './ForumTopicDetail.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { loadTopic, removeTopic } from '@store/slices/forum'
import { selectTopics } from '@store/selectors'
import { forumLink } from '@constants/forum'
import useForumUserIsOwner from '@hooks/useForumUserIsOwner'

/** топик не передается через пропс, а берется из стора, либо загружается с сервера
 * при обновлении страницы, содержание страницы отобразаиться
 */
export type ForumTopicDetailProps = HTMLAttributes<HTMLDivElement>

const ForumTopicDetail: FC<ForumTopicDetailProps> = ({
  className: cls,
  ...attrs
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const topics = useAppSelector(selectTopics)
  /** /forum/topic/:id */
  const { id } = useParams()
  const topicId = Number(id)
  const [topic, setTopic] = useState<Topic>()
  const { user, title, content, created_at, updated_at, cmnt_count } =
    topic || ({} as Topic)
  const [totalPages, setTotalPages] = useState(cmnt_count)
  const isOwner = useForumUserIsOwner(user)
  const [doResponse, setDoResponse] = useState(false)
  const removed = useRef(false)
  const { avatar, user_name } = user || {}
  const dateCreate = new Date(created_at)
  const dateLastMsg = new Date(updated_at)

  useEffect(() => {
    if (removed.current) {
      navigate(forumLink.list)
      return
    }
    /** ищем топик в сторе, если не находим, загружаем с сервера */
    const _topic: Topic | undefined = topics.find(item => item.id === topicId)
    if (_topic) {
      setTopic(_topic)
    } else {
      dispatch(loadTopic(topicId))
    }
    setDoResponse(false)
    if (topic?.comments) {
      setTotalPages(topic.comments.length)
    }
  }, [topics])

  const onEdit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    navigate(forumLink.topicEdit + topicId)
  }
  const onDelete = (e: React.SyntheticEvent) => {
    e.preventDefault()
    removed.current = true
    dispatch(removeTopic(topicId))
  }

  if (topic) {
    return (
      <div className={classNames(cls, 'forum-topic-detail')} {...attrs}>
        <div className="forum-topic-detail__topic p-3 border mb-3">
          <div className="d-flex align-items-center mb-3 forum-topic-detail__topic-header">
            <ForumAvatar
              image={avatar === null ? undefined : avatar}
              size="large"
              alt={`Аватар ${user_name}`}
              className="flex-grow-0 me-4 forum-topic-detail__avatar"
            />
            <div className="forum-topic-detail__about">
              <h2 className="h4 fw-light mb-3">{title}</h2>
              <div className="d-flex align-items-center">
                <div className="me-4 lh-sm text-muted forum-topic-detail__created">
                  <p className="m-0">
                    Автор: <span className="text-truncate">{user_name}</span>
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
                    {totalPages ? (
                      totalPages
                    ) : (
                      <span className="text-nowrap">пока нет</span>
                    )}
                  </p>
                  {totalPages && dateLastMsg ? (
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
          <div className="forum-topic-detail__text mb-3">{content}</div>
          <div className="forum-topic-detail__topic-buttons d-flex justify-content-sm-end">
            {isOwner && (
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
            )}
            <Button
              className="mt-1 me-2"
              onClick={() => setDoResponse(!doResponse)}>
              {doResponse ? 'Не отвечать' : 'Ответить'}
            </Button>
            <Link to="..">
              <Button variant="secondary" className="mt-1">
                Назад, к списку
              </Button>
            </Link>
          </div>
          <AddForumCommentForm
            topicId={topicId}
            className={classNames('forum-topic-detail__add-form mt-3', {
              'd-none': !doResponse,
            })}
          />
        </div>
        <ForumCommentsList
          topic={topic}
          className="forum-topic-detail__comments"
        />
      </div>
    )
  }
  return null
}
export default ForumTopicDetail
