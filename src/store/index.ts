import {configureStore} from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

