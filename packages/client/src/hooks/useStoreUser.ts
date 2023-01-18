import { useAppSelector } from './redux_typed_hooks'
import { shallowEqual } from 'react-redux'
import { selectUserData } from '@store/selectors'

const useStoreUser = () => {
  return useAppSelector(selectUserData, shallowEqual)
}

export default useStoreUser
