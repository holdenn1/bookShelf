import {createAsyncThunk} from "@reduxjs/toolkit";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase";
import {IBook} from "../../types";


export const fetchSeesBooksEveryone = createAsyncThunk<IBook[]>(
  'user/fetchSeesBooksEveryone',
  async () => {
    try {
      const q = query(collection(db, `books-sees-everyone`), where("seesEveryone", "==", true));
      const querySnapshot = await getDocs(q);
      const data: any = querySnapshot.docs.map((doc) => ({...doc.data()}))
      return data
    } catch (e) {
      console.error(e)
    }
  }
)