import { useAppSelector } from './redux_typed_hooks'

const useStoreUser = () => {
  return useAppSelector(state => state.user)
}

export default useStoreUser
