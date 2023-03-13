import { muteRes } from '@utils/index'
import { restAuthApi } from '@api/index'

export const signUp = (data: SignupData) =>
  restAuthApi.post<User>('/signup', data)
export const signIn = (data: SigninData) =>
  restAuthApi.post('/signin', data).then(muteRes)
export const getUser = () => restAuthApi.get<User>('/user')
export const logout = () => restAuthApi.post('/logout').then(muteRes)

export default { signUp, signIn, getUser, logout }
