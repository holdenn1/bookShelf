import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import mainReducer from "./slices/mainSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    main: mainReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

