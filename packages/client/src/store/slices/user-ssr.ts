import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatus, Logged, userInitialState } from '@constants/user'
import type { UserSlice } from '@constants/user'

const prepareUserData = (userData: UserSlice['data']) => ({
  ...userData,
  avatar: userInitialState.data.avatar,
  display_name: userData.display_name || '',
})

const slicer = (initState: UserSlice) =>
  createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
      setUser(state, action: PayloadAction<UserSlice['data']>) {
        const user = action.payload
        state.data = prepareUserData(user)
      },
      clearUser() {
        return { ...initState, loadingStatus: LoadingStatus.Failed }
      },
      loadUser(state) {
        state.data = initState.data
      },
    },
  })

const generateSlice = (initState: UserSlice) => slicer(initState).reducer

const userSlice = slicer(userInitialState)

export const { clearUser, setUser, loadUser } = userSlice.actions

export default generateSlice

export { LoadingStatus, Logged }
