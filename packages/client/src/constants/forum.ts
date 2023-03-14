import { LoadingStatus } from '@store/slices/user'

export type ForumSlice = {
  loadingStatus: LoadingStatus
  topics: Topic[]
}

export const forumInitialState: ForumSlice = {
  loadingStatus: LoadingStatus.Loading,
  topics: [],
}
