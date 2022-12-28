import { httpXML } from '../utils/http';

const API_URL = 'https://ya-praktikum.tech/api/v2';

const getUser = async (): Promise<User | APIError> =>
  httpXML.get(`${API_URL}/auth/user`) as Promise<User | APIError>;

export default { getUser };
