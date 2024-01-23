import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../store/reducer';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: ''
};

interface User {
  name: string;
  email: string;
  accessToken: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { email, name, accessToken } = action.payload;

      state.email = email;
      state.name = name;
      state.accessToken = accessToken;
    }
  }
});

export default userSlice;

export const { setUser } = userSlice.actions;

export const selectIsLoggedIn = (state: RootStateType) => !!state.user.email;
export const selectAccessToken = (state: RootStateType) => state.user.accessToken;
