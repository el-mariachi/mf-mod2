import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ForumComment from '@components/ForumComment'
import './ForumCommentsList.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { loadComments } from '@store/slices/forum'
import { selectLoadingStatus } from '@store/selectors'
import { LoadingStatus } from '@constants/user'
import SpinnerButton from '@components/SpinnerButton'

export type ForumCommentsListProps = HTMLAttributes<HTMLDivElement> & {
  topic: Topic
}
const ForumCommentsList: FC<ForumCommentsListProps> = ({
  topic,
  className: cls,
  ...attrs
}) => {
  const { comments = [] } = topic
  const loadingStatus = useAppSelector(selectLoadingStatus)
  const dispatch = useAppDispatch()
  const commentIsLoading = useRef(false)

  const setCommentIsLoading = (isLoading: boolean) =>
    (commentIsLoading.current = isLoading)
  const isCommentLoading = () => commentIsLoading.current

  useEffect(() => {
    if (!isCommentLoading()) {
      dispatch(loadComments(topic))
      setCommentIsLoading(true)
    } else {
      setCommentIsLoading(false)
    }
  }, [])

  return (
    <div className={classNames(cls, 'forum-comments-list')} {...attrs}>
      <ul className="forum-comments-list__list d-flex flex-column mb-3">
        {loadingStatus === LoadingStatus.Loading ? (
          <SpinnerButton loading={true} />
        ) : (
          comments.map((comment, index) => (
            <li key={index} className="forum-comments-list__comment">
              <ForumComment topic={topic} comment={comment}>{comment.text}</ForumComment>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
export default ForumCommentsList
