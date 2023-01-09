import { DEFAULT_USER } from './constants'

const { id, ...user } = DEFAULT_USER

export default () => Promise.resolve({ ...user, password: '' })
