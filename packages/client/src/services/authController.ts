import authApi from '@api/authApi'
import { apiErrorHandler } from '@utils/errorsHandling'

export function signUpUser(data: SignupData) {
  return authApi.signUp(data).catch(error => apiErrorHandler(error))
}
export function signInUser(data: SigninData) {
  return authApi.signIn(data).catch(error => apiErrorHandler(error))
}
export function defineUser() {
  return authApi.getUser().catch(error => apiErrorHandler(error))
}
export function logout() {
  return authApi.logout().catch(error => apiErrorHandler(error))
}
