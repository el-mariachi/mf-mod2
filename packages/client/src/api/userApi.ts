import { httpXML } from '../utils/http'

const API_URL = 'https://ya-praktikum.tech/api/v2'

type ProfileData = Omit<User, 'id' | 'avatar'>

const updateProfile = async (data: ProfileData): Promise<User | APIError> =>
  httpXML.put(`${API_URL}/user/profile`, { data }) as Promise<User | APIError>

const updateAvatar = async (data: FormData): Promise<User| APIError> =>
  httpXML.put(`${API_URL}/user/profile/avatar`, { data }) as Promise<User | APIError>

const updatePassword = async (data: PasswordData): Promise<unknown | APIError> =>
  httpXML.put(`${API_URL}/user/password`, { data }) as unknown | APIError

export default { updateProfile, updateAvatar, updatePassword }
