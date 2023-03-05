import {createAsyncThunk} from "@reduxjs/toolkit";
import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import {db} from "../../firebase";
import {IBook, IUser} from "../../types";




export const fetchFavoriteBooks = createAsyncThunk<IBook[], IUser>(
  'user/fetchFavoriteBooks',
  async (user) => {
    try {
      const q = query(collection(db, `books-user-${user.id}`), where("favorite", "==", true));
      const querySnapshot = await getDocs(q);
      const data:any = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
      return data
    }catch (e) {
      console.error(e)
    }
  }
)