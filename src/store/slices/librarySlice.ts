import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  visibleAddingBookForm: false
}
const librarySlice = createSlice({
  name:'library',
  initialState,
  reducers:{
    setVisibleAddingBookForm(state, action){
      state.visibleAddingBookForm = action.payload
    }
  }
})

export const {setVisibleAddingBookForm} = librarySlice.actions
export default librarySlice.reducer