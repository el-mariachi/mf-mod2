import { FC } from 'react'
import useUserLoadingStatus from '@hooks/useUserLoadingStatus'
import useLoginStatus from '@hooks/useLoginStatus'
import { Navigate } from 'react-router-dom'
import ROUTES from '@constants/routes'
import { LoadingStatus, Logged } from '@store/slices/user'
import Spinner from '@components/Spinner'

type LoggedInCheckOptions = {
  userRequired: boolean
  escapeRoute: ROUTES
}

const authorizedPageAccessOpts: LoggedInCheckOptions = {
  userRequired: true,
  escapeRoute: ROUTES.SIGN_IN,
}

const nonAuthorizedPageAccessOpts: LoggedInCheckOptions = {
  userRequired: false,
  escapeRoute: ROUTES.ROOT,
}

const LoggedInCheck =
  (options: LoggedInCheckOptions) => (WrappedComponent: FC) => {
    const ComponentWithLoggedInCheck: FC = props => {
      const loggedIn = useLoginStatus() === Logged.In
      const { userRequired, escapeRoute } = options
      const loadingStatus = useUserLoadingStatus()
      let isLoading = loadingStatus === LoadingStatus.Loading
      let needToRedirect =
        (loadingStatus === LoadingStatus.Succeeded ||
          loadingStatus === LoadingStatus.Failed) &&
        ((loggedIn && !userRequired) || (!loggedIn && userRequired))
      if (RENDERED_ON_SERVER) {
        isLoading = false
        needToRedirect = false
      }
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

export { LoggedInCheck, authorizedPageAccessOpts, nonAuthorizedPageAccessOpts }
