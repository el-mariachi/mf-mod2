import { FC } from 'react'
import useUserLoadingStatus from '@hooks/useUserLoadingStatus'
import useLoginStatus from '@hooks/useLoginStatus'
import { Navigate } from 'react-router-dom'
import ROUTES from '@constants/routes'
import { LoadingStatus, Logged } from '@store/slices/user'
import Spinner from '@components/Spinner'

export type LoggedInCheckOptions = {
  userRequired: boolean
  escapeRoute: ROUTES
}

const LoggedInCheck =
  (options: LoggedInCheckOptions) => (WrappedComponent: FC) => {
    const ComponentWithLoggedInCheck: FC = props => {
      const loggedIn = useLoginStatus() === Logged.In
      const { userRequired, escapeRoute } = options
      const loadingStatus = useUserLoadingStatus()
      const isLoading =
        loadingStatus === LoadingStatus.Loading ||
        loadingStatus === LoadingStatus.Idle
      const needToRedirect =
        (loggedIn && !userRequired) || (!loggedIn && userRequired)
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
