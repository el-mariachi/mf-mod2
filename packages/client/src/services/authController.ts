import authApi from '@api/authApi'
import { apiErrorHandler } from '@utils/errorsHandling'

const signUpUser = (data: SignupData) =>
  authApi.signUp(data).catch(error => apiErrorHandler(error))
const signInUser = (data: SigninData) =>
  authApi.signIn(data).catch(error => apiErrorHandler(error))
const defineUser = () =>
  authApi.getUser().catch(error => apiErrorHandler(error))
const logout = () => authApi.logout().catch(error => apiErrorHandler(error))

export { signUpUser, signInUser, defineUser, logout }
