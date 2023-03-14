import { createTopic } from '@services/topicController'
import { forumInitialState } from '@constants/forum'
import { LoadingStatus } from '@constants/user'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteTopic, getTopics } from '@services/topicController'

export const loadTopic = createAsyncThunk('forum/loadTopic', async () => {
  const topics = await getTopics()
  return topics
})

export const addTopic = createAsyncThunk(
  'forum/addTopic',
  async (title: string) => {
    return (await createTopic(title)) as Topic
  }
)

export const removeTopic = createAsyncThunk(
  'forum/removeTopic',
  async (topic: Topic) => {
    await deleteTopic(topic)
    return topic
  }
)

const forumSlice = createSlice({
  name: 'forum',
  initialState: forumInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addTopic.fulfilled, (state, action) => {
        state.topics.push(action.payload)
      })
      .addCase(loadTopic.fulfilled, (state, action) => {
        state.topics = action.payload
      })
      .addCase(removeTopic.fulfilled, (state, action) => {
        const topic = action.payload
        state.topics = state.topics.filter(item => item.id !== topic.id)
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loadingStatus = LoadingStatus.Loading
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          state.loadingStatus = LoadingStatus.Failed
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.loadingStatus = LoadingStatus.Succeeded
        }
      )
  },
})

export default forumSlice.reducer
