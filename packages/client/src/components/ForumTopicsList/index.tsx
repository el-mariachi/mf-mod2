import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import ForumTopic from '@components/ForumTopic'
import { Button, Pagination } from 'react-bootstrap'
import './ForumTopicsList.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { Link } from 'react-router-dom'
import { loadTopics, setPage } from '@store/slices/forum'
import { selectForum } from '@store/selectors'
import { LoadingStatus } from '@constants/user'
import { forumLink } from '@constants/forum'
import SpinnerButton from '@components/SpinnerButton'

const ForumTopicsList = () => {
  const dispatch = useAppDispatch()
  const { topics, loadingStatus, count, page } = useAppSelector(selectForum)
  const totalPages = Math.ceil(count / 10)
  /** useRef вмето useState, для того чтобы избежать множественной загрузки
   * при перерисовке
   */
  const topicsIsLoading = useRef(false)
  const setTopicsIsLoading = (isLoading: boolean) =>
    (topicsIsLoading.current = isLoading)
  const isTopicLoading = () => topicsIsLoading.current
  /**  shouldLoadMoreTopics -
   * (1) текущая страница предполагает большее количество топиков в сторе
   * (2) количество отражаемых топиков на странице меньше 10,
   *  хотя всего топиков больше (при удалении топика)
   * (3) список текушей страницы еще не загружался
   * TODO условие можно упростить
   * TODO баг, если находясь на первой странице нажать 3, логика ломается
   */
  const shouldLoadMoreTopics = () =>
    page > Math.ceil(topics.length / 10) ||
    (topics.length < 10 && topics.length < count) ||
    (topics.length > 0 && count === 0)
  const setTopicListPage = (listPage: number) => dispatch(setPage(listPage))

  useEffect(() => {
    if (!isTopicLoading() && shouldLoadMoreTopics()) {
      dispatch(loadTopics(page))
      setTopicsIsLoading(true)
    } else {
      setTopicsIsLoading(false)
    }
  }, [topics, page])

  return (
    <div className={classNames('', 'forum-topic-list')}>
      <div className="forum-topic-list__buttons d-flex justify-content-sm-end">
        <Link to={forumLink.topicCreate}>
          <Button> Создать тему </Button>
        </Link>
      </div>
      <ul className="forum-topic-list__list d-flex flex-column mt-4 mt-sm-5">
        {loadingStatus === LoadingStatus.Loading ? (
          <SpinnerButton loading={true} />
        ) : (
          topics
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((topicProps, index) => (
              <li
                key={index}
                className="forum-topic-list__topic-container border">
                <Link to={forumLink.topic + topicProps.id}>
                  <ForumTopic
                    className="forum-topic-list__topic"
                    {...topicProps}
                  />
                </Link>
              </li>
            ))
        )}
      </ul>
      <Pagination className="forum-topic-list__pagination">
        {new Array(totalPages).fill(null).map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === page}
            onClick={() => setTopicListPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  )
}
export default ForumTopicsList
