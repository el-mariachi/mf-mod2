import userApi from '@api/userApi'
import { apiErrorHandler } from '@utils/errorsHandling'

type AvatarFields = 'avatar'

interface AvatarData extends FormData {
  append(name: AvatarFields, value: Blob, fileName?: string): void
}

export function updateProfile(data: ProfileData) {
  return userApi.updProfile(data).catch(error => apiErrorHandler(error))
}
export function updateAvatar(data: AvatarData) {
  return userApi.updAvatar(data).catch(error => apiErrorHandler(error))
}
export function updatePassword(data: PasswordData) {
  return userApi.updPassword(data).catch(error => apiErrorHandler(error))
}
