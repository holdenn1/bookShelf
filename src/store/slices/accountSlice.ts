import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchDataLibrary} from "../actions/fetchDataLibrary";
import {fetchFavoriteBooks} from "../actions/fetchFavoriteBooks";
import {IAccount, IBook, IUser} from "../../types";


const initialState: IAccount = {
  user: {
    id: '',
    email: null,
  },
  library: [],
  favoriteBooks: [],
}

const accountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    removeUser(state) {
      state.user = {id: '', email: null}
    },
    setLibrary(state, action: PayloadAction<IBook[]>){
      state.library = action.payload
    },
    setFavorite(state, action: PayloadAction<IBook[]>){
      state.favoriteBooks = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDataLibrary.fulfilled, (state, action) => {
        state.library = action.payload
      })
      .addCase(fetchFavoriteBooks.fulfilled,(state, action) => {
        state.favoriteBooks = action.payload
      })
  }
})

export const {setUser, removeUser,setLibrary,setFavorite} = accountSlice.actions
export default accountSlice.reducer

