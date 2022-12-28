import authApi from '../api/authApi';
import { transformUser } from '../utils/transformUser';
import apiHasError from '../utils/apiHasError';

export async function getUser(): Promise<UserDTO> {
  const result = await authApi.getUser();
  if (apiHasError(result)) {
    throw { result };
  }
  return transformUser(result as User);
}
