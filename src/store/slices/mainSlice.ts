import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBook, IChats, IMainReducer} from "../../types";
import {fetchSeesBooksEveryone} from "../actions/fetchSeesBooksEveryone";

const initialState: IMainReducer = {
  visibleAddingBookForm: false,
  visibleMenu: true,
  isOpenSearchMenu: false,
  visibleMessageForm: false,
  search: '',
  currentBook: {} as IBook,
  booksSeesEveryone: [],
  isOpenChatList: false
}

const mainSlice = createSlice(
  {
    name: 'main',
    initialState,
    reducers: {
      setVisibleAddingBookForm(state, action: PayloadAction<boolean>) {
        state.visibleAddingBookForm = action.payload
      },
      setVisibleMessageForm(state, action: PayloadAction<boolean>) {
        state.visibleMessageForm = action.payload
      },
      setVisibleMenu(state, action: PayloadAction<boolean>) {
        state.visibleMenu = action.payload
      },
      setSearch(state, action: PayloadAction<string>) {
        state.search = action.payload
      },
      setCurrentBook(state, action: PayloadAction<IBook>) {
        state.currentBook = action.payload
      },
      setOpenSearchMenu(state, action: PayloadAction<boolean>) {
        state.isOpenSearchMenu = action.payload
      },
      setVisibleChatList(state) {
        state.isOpenChatList = !state.isOpenChatList
      }

    },
    extraReducers: builder => {
      builder
        .addCase(fetchSeesBooksEveryone.fulfilled, (state, action) => {
          state.booksSeesEveryone = action.payload
        })
    }
  }
)

export const {
  setVisibleAddingBookForm,
  setVisibleMessageForm,
  setSearch,
  setCurrentBook,
  setVisibleMenu,
  setOpenSearchMenu,
  setVisibleChatList
} = mainSlice.actions
export default mainSlice.reducer