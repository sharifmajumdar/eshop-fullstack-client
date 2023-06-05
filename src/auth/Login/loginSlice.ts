import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
//import type { RootState } from '../../app/store'

export interface UserState {
  email: string
}

const initialState: UserState = {
  email: ''
}

const loginSlice = createSlice({
  initialState,
  name: 'login',
  reducers: {
    getUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    }
  }
})

export const UserState = (state: any) => state.email;
export const { getUserEmail } = loginSlice.actions
export default loginSlice.reducer