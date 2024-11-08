import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});
