import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import applicationReducer from './applicationSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    application: applicationReducer,
  },
});
