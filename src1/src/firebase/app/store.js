import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/userSlice';
import appReducer from '../../features/appSlice';
// import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    user: userReducer,
    app: appReducer,
  },
});