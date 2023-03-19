import {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { Pagination } from 'react-bootstrap'
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
  }, [topic.comments])

  /*comments.push(  {
    user: {user_name: 'Петр', avatar: null, yandex_id:1},
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    created_at: new Date(2023, 0, 18, 14, 33).toDateString(),
  },)*/
  return (
    <div className={classNames(cls, 'forum-comments-list')} {...attrs}>
      <ul className="forum-comments-list__list d-flex flex-column mb-3">
        {loadingStatus === LoadingStatus.Loading ? (
          <SpinnerButton loading={true} />
        ) : (
          comments.map((comment, index) => (
            <li key={index} className="forum-comments-list__comment">
              <ForumComment comment={comment}>{comment.text}</ForumComment>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
export default ForumCommentsList
