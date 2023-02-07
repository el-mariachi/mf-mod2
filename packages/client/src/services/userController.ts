import userApi from '@api/userApi'
import { apiErrorHandler } from '@utils/errorsHandling'

type AvatarFields = 'avatar'

interface AvatarData extends FormData {
  append(name: AvatarFields, value: Blob, fileName?: string): void
}

const updateProfile = (data: ProfileData) =>
  userApi.updProfile(data).catch(error => apiErrorHandler(error))
const updateAvatar = (data: AvatarData) =>
  userApi.updAvatar(data).catch(error => apiErrorHandler(error))
const updatePassword = (data: PasswordData) =>
  userApi.updPassword(data).catch(error => apiErrorHandler(error))

export { updateProfile, updateAvatar, updatePassword }
