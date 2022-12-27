import userApi from '../api/userApi'
import { transformUser, transformUserT } from '../utils/transformUser'
import apiHasError from '../utils/apiHasError';

type AvatarFields = 'avatar'

interface AvatarData extends FormData {
  append(name: AvatarFields, value: Blob, fileName?: string): void
}

export async function updateProfile(data: ProfileDataT): Promise<UserDTO> {
  const result = await userApi.updateProfile(transformUserT(data as unknown as UserDTO));
  if (apiHasError(result)) {
    throw { result };
  }
  return transformUser(result as User);
}

export async function updateAvatar(data: AvatarData): Promise<UserDTO> {
  const result = await userApi.updateAvatar(data);
  if (apiHasError(result)) {
    throw { result };
  }
  return transformUser(result  as User);
}

export async function updatePassword(data: PasswordData) {
  const result = await userApi.updatePassword(data);
  if (apiHasError(result)) {
    throw { result };
  };
  return;
}
