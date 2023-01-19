import { FC, useEffect } from 'react'
import useStoreUser from '@hooks/useStoreUser'
import useStoreUserStatus from '@hooks/useStoreUserStatus'
import { Navigate, useLocation } from 'react-router-dom'
import ROUTES from '@constants/routes'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { loadUser, LoadingStatus } from '@store/slices/user'
import Spinner from '@components/Spinner'

export type LoggedInCheckOptions = {
  userRequired: boolean
  escapeRoute: ROUTES
}

const LoggedInCheck =
  (options: LoggedInCheckOptions) => (WrappedComponent: FC) => {
    const ComponentWithLoggedInCheck: FC = props => {
      const dispatch = useAppDispatch()
      const location = useLocation()
      const { userRequired, escapeRoute } = options
      const user = useStoreUser()
      const loadingStatus = useStoreUserStatus()
      const loggedIn = user.id !== 0
      const isLoading = loadingStatus === LoadingStatus.Loading
      const needToRedirect =
        location.pathname === window.location.pathname &&
        ((loggedIn && !userRequired) || (!loggedIn && userRequired))

      useEffect(() => {
        dispatch(loadUser())
      }, [])

      return isLoading ? (
        <Spinner />
      ) : needToRedirect ? (
        <Navigate to={escapeRoute} />
      ) : (
        <WrappedComponent {...props} />
      )
    }
    return ComponentWithLoggedInCheck
  }

export { LoggedInCheck }
