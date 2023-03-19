import { useAppSelector } from './redux_typed_hooks'
import { shallowEqual } from 'react-redux'
import { selectUserData } from '@store/selectors'

const useForumUserIsOwner = (forumUser?: ForumUser) => {
  const userData = useAppSelector(selectUserData, shallowEqual)
  return userData.id === forumUser?.yandex_id
}

export default useForumUserIsOwner
