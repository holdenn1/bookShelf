import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBook, IMainReducer} from "../../types";
import {fetchSeesBooksEveryone} from "../actions/fetchSeesBooksEveryone";

const initialState: IMainReducer = {
  visibleAddingBookForm: false,
  search: '',
  booksSeesEveryone: []
}

const mainSlice = createSlice(
  {
    name: 'main',
    initialState,
    reducers: {
      setVisibleAddingBookForm(state, action: PayloadAction<boolean>) {
        state.visibleAddingBookForm = action.payload
      },
      setSearch(state, action: PayloadAction<string>) {
        state.search = action.payload
      },
      setBooksEveryone(state, action: PayloadAction<IBook[]>) {
        state.booksSeesEveryone = action.payload
      },
    },
    extraReducers: builder => {
      builder
        .addCase(fetchSeesBooksEveryone.fulfilled, (state, action) => {
          state.booksSeesEveryone = action.payload
        })
    }
  }
)

export const {setVisibleAddingBookForm, setSearch, setBooksEveryone} = mainSlice.actions
export default mainSlice.reducer