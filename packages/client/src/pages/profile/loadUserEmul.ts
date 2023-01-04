import { DEFAULT_USER } from './constants'

export default () => Promise.resolve({ ...DEFAULT_USER, password: '' })
