import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootStateType} from '../store/reducer';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
};

type SetUserPayload = {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const {email, name, accessToken, refreshToken} = action.payload;

      state.email = email;
      state.name = name;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export default userSlice;

export const {setUser} = userSlice.actions;

export const selectIsLoggedIn = (state: RootStateType) => !!state.user.email;
