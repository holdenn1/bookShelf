import {createAsyncThunk} from "@reduxjs/toolkit";
import {notify} from "../../components/UI/Toast/Toast";
import {arrayUnion, arrayRemove, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";
import {LikeAndUnLikeProps} from "../../types";


export const setLikeBook = createAsyncThunk<void, LikeAndUnLikeProps>(
  'user/setLikeBook',
  async ({isAuth, book, user}, {dispatch}) => {
    try {
      if (!isAuth) {
        notify('Only registered users can rate', 'error')
        return
      }
      const checkUserLike = book.userWhoLikesBook.some(id => id === user.id)
      const checkUserUnlike = book.userWhoUnlikesBook.some(id => id === user.id)
      const docUserRef = doc(db, `books-user-${book.userId}`, `${book.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)

      if (!checkUserLike && checkUserUnlike) {
        await updateDoc(docPublicRef, {rating: book.rating + 2, userWhoLikesBook: arrayUnion(user.id)});
        await updateDoc(docUserRef, {rating: book.rating + 2, userWhoLikesBook: arrayUnion(user.id)});
        await updateDoc(docPublicRef, {userWhoUnlikesBook: arrayRemove(user.id)});
        await updateDoc(docUserRef, {userWhoUnlikesBook: arrayRemove(user.id)});
        notify('Your rating has been credited', 'success')
      } else if (!checkUserLike) {
        await updateDoc(docPublicRef, {rating: book.rating + 1, userWhoLikesBook: arrayUnion(user.id)});
        await updateDoc(docUserRef, {rating: book.rating + 1, userWhoLikesBook: arrayUnion(user.id)});
        notify('Your rating has been credited', 'success')
      } else {
        await updateDoc(docPublicRef, {rating: book.rating - 1, userWhoLikesBook: arrayRemove(user.id)});
        await updateDoc(docUserRef, {rating: book.rating - 1, userWhoLikesBook: arrayRemove(user.id)});
        notify('Your rating has been deleted', 'success')
      }
      dispatch(fetchSeesBooksEveryone())
    } catch (e) {
      console.error(e)
      notify('An error occurred, please try again later', 'error')
    }
  }
)