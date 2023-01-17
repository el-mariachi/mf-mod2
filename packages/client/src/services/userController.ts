import userApi from '@api/userApi'
import { transformUser, transformUserT } from '@utils/transformUser'
import { apiErrorHandler } from '@utils/errors_handling'

type AvatarFields = 'avatar'

interface AvatarData extends FormData {
  append(name: AvatarFields, value: Blob, fileName?: string): void
}

export function updateProfile(data: ProfileData) {
  return userApi
    .updProfile(data)
    .then(result => transformUser(result)) // TODO отсалось определиться с хранением пользователя
    .catch(error => apiErrorHandler(error))
}
export function updateAvatar(data: AvatarData) {
  return userApi
    .updAvatar(data)
    .then(result => transformUser(result))
    .catch(error => apiErrorHandler(error))
}
export function updatePassword(data: PasswordData) {
  return userApi.updPassword(data).catch(error => apiErrorHandler(error))
}
