import { configureStore } from '@reduxjs/toolkit' 
import cartSlice from './cartSlice'
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  devTools:true,


  //  error fixing (A non-serializable value was detected in the state)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})