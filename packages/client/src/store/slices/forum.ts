import { createTopic, updateTopic } from '@services/topicController'
import { forumInitialState, forumLink } from '@constants/forum'
import { LoadingStatus } from '@constants/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteTopic, getTopic, getTopics } from '@services/topicController'
import {
  createComment,
  deleteComment,
  updateComment,
} from '@services/commentController'
import { getComments } from '@api/commentApi'

export const loadTopic = createAsyncThunk(
  'forum/loadTopic',
  async (id: number) => {
    const topic = await getTopic(id)
    return topic
  }
)

export const loadTopics = createAsyncThunk(
  'forum/loadTopics',
  async (page: number) => await getTopics(page)
)

export const addTopic = createAsyncThunk(
  'forum/addTopic',
  async (topic: Partial<Topic>) => {
    const _topic = (await createTopic(topic)) as Topic
    window.history.back()
    return _topic
  }
)

export const editTopic = createAsyncThunk(
  'forum/updateTopic',
  async (topic: Topic) => {
    ;(await updateTopic(topic)) as Topic
    window.history.back()
    return topic
  }
)

export const removeTopic = createAsyncThunk(
  'forum/removeTopic',
  async (id: number) => {
    await deleteTopic(id)
    window.history.pushState({}, '', forumLink.list)
    return id
  }
)

export const loadComments = createAsyncThunk(
  'forum/loadComments',
  async (topic: Topic) => {
    const comments = await getComments(topic.id)
    return { topicId: topic.id, comments }
  }
)

export const addComment = createAsyncThunk(
  'forum/addComment',
  async (comment: Partial<TopicComment>) =>
    (await createComment(comment)) as TopicComment
)

export const editComment = createAsyncThunk(
  'forum/editComment',
  async (comment: TopicComment) => {
    await updateComment(comment)
    return comment
  }
)

export const removeComment = createAsyncThunk(
  'forum/removeComment',
  async (comment: TopicComment) => {
    await deleteComment(comment.id)
    return comment
  }
)

const forumSlice = createSlice({
  name: 'forum',
  initialState: forumInitialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTopic.fulfilled, (state, action) => {
        const topic = action.payload as Topic
        state.topics.push(topic)
        state.count += 1
      })
      .addCase(editTopic.fulfilled, (state, action) => {
        const topic = action.payload
        state.topics = state.topics.map(item =>
          item.id === topic.id ? topic : item
        )
      })
      .addCase(loadTopic.fulfilled, (state, action) => {
        const topic = action.payload
        if (topic?.id && !state.topics.some(item => item.id === topic.id)) {
          state.topics.push(topic)
        }
      })
      .addCase(loadTopics.fulfilled, (state, action) => {
        const { count, rows } = action.payload
        state.count = count
        state.topics.splice((state.page - 1) * 10, 10, ...rows)
      })
      .addCase(removeTopic.fulfilled, (state, action) => {
        const topicId = action.payload
        state.topics = state.topics.filter(item => item.id !== topicId)
        state.count -= 1
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        const { topicId, comments } = action.payload
        const topic = state.topics.find(item => item.id === topicId)
        if (topic) {
          topic.comments = comments
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const comment = action.payload as TopicComment
        const topic = state.topics.find(item => item.id === comment.topic_id)
        if (topic) {
          topic.comments ??= []
          topic.comments.push(comment)
        }
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const comment = action.payload as TopicComment
        const topic = state.topics.find(item => item.id === comment.topic_id)
        if (topic && topic.comments) {
          const _comments = topic.comments.filter(
            item => item.id !== comment.id
          )
          topic.comments = [..._comments, comment]
        }
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const comment = action.payload
        const topicId = comment.topic_id
        const topic = state.topics.find(item => item.id === topicId)
        if (topic?.comments) {
          topic.comments = topic.comments.filter(item => item.id !== comment.id)
        }
      })
      .addMatcher(
        action => /^forum.*?\/pending/.test(action.type),
        state => {
          state.loadingStatus = LoadingStatus.Loading
        }
      )
      .addMatcher(
        action => /^forum.*?\/rejected/.test(action.type),
        state => {
          state.loadingStatus = LoadingStatus.Failed
        }
      )
      .addMatcher(
        action => /^forum.*?\/fulfilled/.test(action.type),
        state => {
          state.loadingStatus = LoadingStatus.Succeeded
        }
      )
  },
})

export const { setPage } = forumSlice.actions

export default forumSlice.reducer
