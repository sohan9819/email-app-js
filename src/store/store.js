import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../slice/email';
import emailDetailReducer from '../slice/emailDetail';
import userReducer from '../slice/user';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    emailDetail: emailDetailReducer,
    user: userReducer,
  },
});
