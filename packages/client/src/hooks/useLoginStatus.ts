import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectLoginStatus } from '@store/selectors'

const useStoreUserStatus = () => {
  return useAppSelector(selectLoginStatus)
}

export default useStoreUserStatus
