import { FC, useEffect } from 'react'
import useStoreUser from '@hooks/useStoreUser'
import useStoreUserStatus from '@hooks/useStoreUserStatus'
import { Navigate, useLocation } from 'react-router-dom'
import ROUTES from '@constants/routes'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { loadUser, LoadingStatus } from '@store/slices/user'

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
      const needToRedirect =
        loadingStatus !== LoadingStatus.Loading && // no redirects while loading in progress
        location.pathname === window.location.pathname &&
        ((loggedIn && !userRequired) || (!loggedIn && userRequired))

      useEffect(() => {
        dispatch(loadUser())
      }, [])

      return needToRedirect ? (
        <Navigate to={escapeRoute} />
      ) : (
        <WrappedComponent {...props} />
      )
    }
    return ComponentWithLoggedInCheck
  }

export { LoggedInCheck }
