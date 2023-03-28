import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchDataLibrary} from "../actions/fetchDataLibrary";
import {fetchFavoriteBooks} from "../actions/fetchFavoriteBooks";
import {IAccount, IBook, IChats, IMessage, IUser} from "../../types";
import {uploadBook} from "../actions/uploadBook";
import {removeBook} from "../actions/removeBook";


const initialState: IAccount = {
  user: {
    id: '',
    email: '',
  },
  library: [],
  favoriteBooks: [],
  loading: false,
  error: '',
  chats: [],
  messages: []
}

const accountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    removeUser(state) {
      state.user = {id: '', email: ''}
    },
    setLibrary(state, action: PayloadAction<IBook[]>) {
      state.library = action.payload
    },
    setFavorite(state, action: PayloadAction<IBook[]>) {
      state.favoriteBooks = action.payload
    },
    setChats(state, action: PayloadAction<IChats[]>) {
      state.chats = action.payload
    },
    setMessages(state, action: PayloadAction<IMessage[]>) {
      state.messages = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDataLibrary.fulfilled, (state, action) => {
        state.library = action.payload
      })
      .addCase(fetchFavoriteBooks.fulfilled, (state, action) => {
        state.favoriteBooks = action.payload
      })
      .addCase(uploadBook.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(uploadBook.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(uploadBook.rejected, (state, action) => {
        state.loading = false
        console.log(action.payload)
        state.error = action.payload as string
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export const {
  setUser,
  removeUser,
  setLibrary,
  setChats,
  setMessages,
  setFavorite
} = accountSlice.actions
export default accountSlice.reducer

