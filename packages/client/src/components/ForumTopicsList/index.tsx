import ForumTopic from '@components/ForumTopic'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { selectTopics, selectForumLoadingStatus } from '@store/selectors'
import { loadTopic } from '@store/slices/forum'
import { useEffect } from 'react'
import './ForumTopicsList.scss'
import BootstrapSpinner from '@components/BootstrapSpinner'
import { LoadingStatus } from '@constants/user'
import ErrorBox from '@components/ErrorBox'

function ForumTopicsList() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadTopic())
  }, [])

  const topics = useAppSelector(selectTopics)
  const loadingStatus = useAppSelector(selectForumLoadingStatus)
  console.log('loadingStatus', loadingStatus)

  return (
    <>
      {loadingStatus === LoadingStatus.Loading && <BootstrapSpinner />}
      {loadingStatus === LoadingStatus.Succeeded && <ErrorBox />}
      <ul className="forum-topic-list d-flex flex-column">
        {topics.map((topic, index) => (
          <ForumTopic key={index} topic={topic} />
        ))}
      </ul>
    </>
  )
}

export default ForumTopicsList
