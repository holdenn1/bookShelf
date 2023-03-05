import {createAsyncThunk} from "@reduxjs/toolkit";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {IBook} from "../../types";

export const fetchDataLibrary = createAsyncThunk<IBook[], string>
(
  'user/fetchDataLibrary',
  async (id) => {
    try {
      const querySnapshot = await getDocs(collection(db, `books-user-${id}`))
      const data: any = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
      return data
    } catch (e) {
      console.error(e)
    }
  }
)