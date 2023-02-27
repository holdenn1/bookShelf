import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import librarySlice from "./slices/librarySlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    library: librarySlice
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

