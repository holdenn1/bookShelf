import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";
import {fetchFavoriteBooks} from "./fetchFavoriteBooks";
import {fetchDataLibrary} from "./fetchDataLibrary";
import {IBook, IUser} from "../../types";
import {notify} from "../../components/UI/Toast/Toast";

type RemoveBookProps = {
  user: IUser
  book: IBook
}

export const removeBook = createAsyncThunk<void, RemoveBookProps>(
  'user/removeBook',
  async ({user, book}, {dispatch}) => {
    try {
      await deleteDoc(doc(db, `books-user-${user.id}`, `${book.id}`));
      if (book.seesEveryone) {
        await deleteDoc(doc(db, "books-sees-everyone", `${book.booksEveryoneCollectionID}`));
        dispatch(fetchSeesBooksEveryone())
      }
      if (book.favorite) {
        dispatch(fetchFavoriteBooks(user))
      }
      dispatch(fetchDataLibrary(user.id))
      notify('The book has been deleted', 'success')
    } catch (e) {
      console.error(e)
      notify('An error occurred, please try again later', 'error')
    }
  }
)