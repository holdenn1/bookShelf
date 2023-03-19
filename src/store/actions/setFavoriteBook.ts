import {createAsyncThunk} from "@reduxjs/toolkit";
import {setLibrary} from "../slices/accountSlice";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";
import {fetchFavoriteBooks} from "./fetchFavoriteBooks";
import {SetFavoriteAndPublicProps} from "../../types";
import {notify} from "../../components/UI/Toast/Toast";

export const setFavoriteBook = createAsyncThunk<void, SetFavoriteAndPublicProps>(
  'user/setFavoriteBook',
  async ({book, library, user}, {dispatch}) => {
    try {
      const isFavorite = library.map(item => {
          if (item.id == book.id) {
            return {...item, favorite: !item.favorite}
          }
          return item
        }
      )

      dispatch(setLibrary(isFavorite))

      const docUserRef = doc(db, `books-user-${user.id}`, `${book.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
      await updateDoc(docUserRef, {favorite: !book.favorite});

      if (book.seesEveryone) {
        await updateDoc(docPublicRef, {favorite: !book.favorite});
      }
      dispatch(fetchSeesBooksEveryone())
      dispatch(fetchFavoriteBooks(user))
    } catch (e) {
      console.error(e)
      notify('An error occurred, please try again later', 'error'
      )
    }
  }
)