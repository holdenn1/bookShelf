import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  visibleAddingBookForm: false
}

const accountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action){
      state.id = action.payload.id
      state.email = action.payload.email
    },
		removeUser(state){
			state.id = null
			state.email = null
		},
    setVisibleAddingBookForm(state, action){
      state.visibleAddingBookForm = action.payload
    }
  }
})

export const {setUser, removeUser, setVisibleAddingBookForm} = accountSlice.actions
export default accountSlice.reducer

