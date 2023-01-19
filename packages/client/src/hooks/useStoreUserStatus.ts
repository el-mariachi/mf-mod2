import { useAppSelector } from '@hooks/redux_typed_hooks'
import { shallowEqual } from 'react-redux'
import { selectUserStatus } from '@store/selectors'

const useStoreUserStatus = () => {
  return useAppSelector(selectUserStatus, shallowEqual)
}

export default useStoreUserStatus
