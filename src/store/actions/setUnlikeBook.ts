import {createAsyncThunk} from "@reduxjs/toolkit";
import {LikeAndUnLikeProps} from "../../types";
import {notify} from "../../components/UI/Toast/Toast";
import {arrayRemove, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";

export const setUnlikeBook = createAsyncThunk(
  'user/setUnlikeBook',
  async ({isAuth, book, user}: LikeAndUnLikeProps, {dispatch}) => {
    try {
      if (!isAuth) {
        notify('Only registered users can rate')
        return
      }
      const checkUserLike = book.userWhoLikesBook.some(id => id === user.id)
      if (checkUserLike) {
        const docUserRef = doc(db, `books-user-${book.userId}`, `${book.id}`);
        const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
        await updateDoc(docPublicRef, {rating: book.rating - 1, userWhoLikesBook: arrayRemove(user.id)});
        await updateDoc(docUserRef, {rating: book.rating - 1, userWhoLikesBook: arrayRemove(user.id)});
      } else {
        notify('You have not rated yet')
      }
      dispatch(fetchSeesBooksEveryone())
    } catch (e) {
      console.error(e)
    }
  }
)