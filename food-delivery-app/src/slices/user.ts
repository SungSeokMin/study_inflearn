import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../store/reducer';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  money: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, name, accessToken } = action.payload;

      state.email = email;
      state.name = name;
      state.accessToken = accessToken;
    },
    setMoney: (state, action) => {
      state.money = action.payload;
    }
  }
});

export default userSlice;

export const { setUser, setMoney } = userSlice.actions;

export const selectIsLoggedIn = (state: RootStateType) => !!state.user.email;
export const selectName = (state: RootStateType) => state.user.name;
export const selectMoney = (state: RootStateType) => state.user.money;
export const selectAccessToken = (state: RootStateType) => state.user.accessToken;
