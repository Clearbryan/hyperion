import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface IUserState {
  username?: string | null;
  emailAddress?: string | null;
  _id?: string | null;
  token?: string | null;
}

const initialState: IUserState = {
  username: null,
  emailAddress: null,
  _id: null,
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        username: string | null;
        emailAddress: string | null;
        _id: string | null;
        token: string | null;
      }>
    ) => {
        localStorage.setItem('user', JSON.stringify({
            username: action.payload.username,
            token: action.payload.token,
            _id: action.payload._id,
            emailAddress: action.payload.emailAddress
         })
        )
        state.username = action.payload.username
        state.emailAddress = action.payload.emailAddress
        state._id = action.payload._id
        state.token = action.payload.token
    },
    logout:( state) =>  {
        localStorage.clear()
        state.username = null
        state.emailAddress = null
        state._id = null
        state.token = null

    }
  }
});

export const selectAuth = (state: RootState) => state.auth
export const { setUser, logout } = authSlice.actions
export default authSlice.reducer