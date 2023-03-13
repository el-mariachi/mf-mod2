import { createTopic } from '@services/topicController'
import { forumInitialState, ForumSlice } from '@constants/forum'
import { LoadingStatus } from '@constants/user'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteTopic, getTopic } from '@services/topicController'

export const loadTopic = createAsyncThunk('forum/loadTopic', async () => {
  const topics = (await getTopic()) as unknown as Topic[]
  return topics
})

export const addTopic = createAsyncThunk(
  'forum/addTopic',
  async (title: string) => {
    return await createTopic(title)
  }
)

export const removeTopic = createAsyncThunk(
  'forum/removeTopic',
  async (topic: Topic) => {
    await deleteTopic(topic)
    return topic
  }
)

const slicer = (initState: ForumSlice) =>
  createSlice({
    name: 'forum',
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(addTopic.fulfilled, (state, action) => {
          state.topics = [...state.topics, action.payload]
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

const generateSlice = (initState: ForumSlice) => slicer(initState).reducer

const forumSlice = slicer(forumInitialState)

//export const { clearUser, setUser } = userSlice.actions

export default generateSlice
