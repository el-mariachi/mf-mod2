import { muteRes } from '../utils'
import { restAuthApi } from './restApi'

export const signUp = (data: SignupData) =>
  restAuthApi.post<User>('/signUp', data)
export const signIn = (data: SigninData) =>
  restAuthApi.post('/signIn', data).then(muteRes)
export const getUser = () => restAuthApi.get<User>('/user')
export const logout = () => restAuthApi.post('/logout').then(muteRes)

export default { signUp, signIn, getUser, logout }
