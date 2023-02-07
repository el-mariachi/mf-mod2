import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { defineUser } from '@services/authController'
import { getFile } from '@api/resourceApi'

export enum LoadingStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export enum Logged {
  In = 'In',
  Out = 'Out',
}

const initialState = {
  loadingStatus: LoadingStatus.Idle,
  loginStatus: Logged.Out,
  data: {
    id: 0,
    email: '',
    login: '',
    second_name: '',
    first_name: '',
    display_name: '',
    phone: '',
    avatar: 'https://cdn-icons-png.flaticon.com/512/5953/5953714.png',
  },
}

/**
 * This will generate three action creators and action types:
 * loadUser.pending: user/loadUser/pending
 * loadUser.fulfilled: user/loadUser/fulfilled
 * loadUser.rejected: user/loadUser/rejected
 *
 * ! use them in createSlice's extraReducers option
 */
export const loadUser = createAsyncThunk('user/loadUser', async () => {
  const userByCookie = await defineUser()
  return userByCookie
})

const prepareUserData = (userData: typeof initialState['data']) => ({
  ...userData,
  avatar:
    userData.avatar !== null
      ? getFile(userData.avatar)
      : initialState.data.avatar,
  display_name: userData.display_name || '',
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<typeof initialState.data>) {
      const user = action.payload
      state.data = prepareUserData(user)
    },
    clearUser() {
      return { ...initialState, loadingStatus: LoadingStatus.Failed }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        state.loadingStatus = LoadingStatus.Loading
        state.loginStatus = Logged.Out
      })
      .addCase(loadUser.rejected, state => {
        state.loadingStatus = LoadingStatus.Failed
        state.loginStatus = Logged.Out
        state.data = initialState.data
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Succeeded
        const user = action.payload
        state.data = prepareUserData(user)
        state.loginStatus = Logged.In
        // state.loadingStatus = LoadingStatus.Idle
      })
  },
})

export const { clearUser, setUser } = userSlice.actions

export default userSlice.reducer
