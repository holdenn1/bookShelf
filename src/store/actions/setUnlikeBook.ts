import {createAsyncThunk} from "@reduxjs/toolkit";
import {LikeAndUnLikeProps} from "../../types";
import {notify} from "../../components/UI/Toast/Toast";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";

export const setUnlikeBook = createAsyncThunk<void, LikeAndUnLikeProps>(
  'user/setUnlikeBook',
  async ({isAuth, book, user}, {dispatch}) => {
    try {
      if (!isAuth) {
        notify('Only registered users can rate', 'error')
        return
      }
      const checkUserUnlike = book.userWhoUnlikesBook.some(id => id === user.id)
      const checkUserLike = book.userWhoLikesBook.some(id => id === user.id)
      const docUserRef = doc(db, `books-user-${book.userId}`, `${book.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
      if (!checkUserUnlike && checkUserLike) {
        await updateDoc(docPublicRef, {rating: book.rating - 2, userWhoUnlikesBook: arrayUnion(user.id)});
        await updateDoc(docUserRef, {rating: book.rating - 2, userWhoUnlikesBook: arrayUnion(user.id)});
        await updateDoc(docPublicRef, {userWhoLikesBook: arrayRemove(user.id)});
        await updateDoc(docUserRef, {userWhoLikesBook: arrayRemove(user.id)});
        notify('Your rating has been credited', 'success')
      } else if (!checkUserUnlike) {
        await updateDoc(docPublicRef, {rating: book.rating - 1, userWhoUnlikesBook: arrayUnion(user.id)});
        await updateDoc(docUserRef, {rating: book.rating - 1, userWhoUnlikesBook: arrayUnion(user.id)});
        notify('Your rating has been credited', 'success')
      } else {
        await updateDoc(docPublicRef, {rating: book.rating + 1, userWhoUnlikesBook: arrayRemove(user.id)});
        await updateDoc(docUserRef, {rating: book.rating + 1, userWhoUnlikesBook: arrayRemove(user.id)});
        notify('Your rating has been deleted', 'success')
      }
      dispatch(fetchSeesBooksEveryone())
    } catch (e) {
      console.error(e)
      notify('An error occurred, please try again later', 'error')
    }
  }
)
