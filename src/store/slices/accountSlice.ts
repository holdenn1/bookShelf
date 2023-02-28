import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IBook {
  id: string
  title: string,
  description: string
  cover: string
}

interface IUser {
  id: string,
  email: string | null,
}

interface IAccount {
  user: IUser
  visibleAddingBookForm: boolean,
  library: IBook[]
}

const initialState: IAccount = {
  user: {
    id: '',
    email: null,
  },
  visibleAddingBookForm: false,
  library: []
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
    addBook(state, action: PayloadAction<IBook>){
      state.library.push(action.payload)
    }
  }
})

export const {setUser, removeUser, setVisibleAddingBookForm,addBook} = accountSlice.actions
export default accountSlice.reducer

