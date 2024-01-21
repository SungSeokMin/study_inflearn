import {combineReducers} from '@reduxjs/toolkit';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
