import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import { routerReducer } from 'react-router-redux';

export default configureStore({
  reducer: {
    routing: routerReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
