import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  email: '',
  login: '',
  second_name: '',
  first_name: '',
  display_name: '',
  phone: '',
  avatar: 'https://cdn-icons-png.flaticon.com/512/5953/5953714.png',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<typeof initialState>) {
      const user = action.payload
      return {
        ...user,
        avatar: user.avatar || initialState.avatar,
        display_name: user.display_name || '',
      }
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
