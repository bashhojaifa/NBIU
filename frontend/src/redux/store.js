//External import
import { configureStore } from '@reduxjs/toolkit';

//Internal Import
import settingReducer from './slice/settingReducer';
import authReducer from './slice/authReducer';
import { apiService } from './services/baseQuery';

const store = configureStore({
  reducer: {
    authReducer,
    settingReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiService.middleware]),
});

export default store;
