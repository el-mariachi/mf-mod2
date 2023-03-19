import { LoadingStatus } from '@store/slices/user'

export enum forumLink{
  list = '/forum',
  topicCreate = '/forum/topic/new',
  topicEdit = '/forum/topic/edit/',
  topic = '/forum/topic/'
}

export type ForumSlice = {
  loadingStatus: LoadingStatus
  topics: Topic[]
  count: number
  page: number
}

export const forumInitialState: ForumSlice = {
  loadingStatus: LoadingStatus.Idle,
  topics: [],
  count: 0,
  page: 1,
}
