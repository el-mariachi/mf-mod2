import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectLoadingStatus } from '@store/selectors'

const useUserLoadingStatus = () => {
  return useAppSelector(selectLoadingStatus)
}

export default useUserLoadingStatus
