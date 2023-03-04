import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface IBook {
  id: string
  title: string,
  description: string
  cover: string
  favorite?: boolean
}

interface IUser {
  id: string,
  email: string | null,
}

interface IAccount {
  user: IUser
  visibleAddingBookForm: boolean,
  library: IBook[]
  favoriteBooks: IBook[]
}

const initialState: IAccount = {
  user: {
    id: '',
    email: null,
  },
  visibleAddingBookForm: false,
  library: [],
  favoriteBooks: []
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
    setVisibleAddingBookForm(state, action: PayloadAction<boolean>) {
      state.visibleAddingBookForm = action.payload
    },
    addBookToLibrary(state, action: PayloadAction<IBook[]>){
      state.library = action.payload
    },
    addBookToFavorite(state, action: PayloadAction<IBook[]>){
      state.favoriteBooks = action.payload
    }
  }
})

export const {setUser, removeUser, setVisibleAddingBookForm,addBookToLibrary, addBookToFavorite} = accountSlice.actions
export default accountSlice.reducer

