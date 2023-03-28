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
      const checkUserUnlike = book.usersWhoUnlikesBook.some(id => id === user.id)
      const checkUserLike = book.usersWhoLikesBook.some(id => id === user.id)
      const docUserRef = doc(db, `books-user-${book.userId}`, `${book.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
      if (!checkUserUnlike && checkUserLike) {
        await updateDoc(docPublicRef, {rating: book.rating - 2, usersWhoUnlikesBook: arrayUnion(user.id)});
        await updateDoc(docUserRef, {rating: book.rating - 2, usersWhoUnlikesBook: arrayUnion(user.id)});
        await updateDoc(docPublicRef, {usersWhoLikesBook: arrayRemove(user.id)});
        await updateDoc(docUserRef, {usersWhoLikesBook: arrayRemove(user.id)});
        notify('Your rating has been credited', 'success')
      } else if (!checkUserUnlike) {
        await updateDoc(docPublicRef, {rating: book.rating - 1, usersWhoUnlikesBook: arrayUnion(user.id)});
        await updateDoc(docUserRef, {rating: book.rating - 1, usersWhoUnlikesBook: arrayUnion(user.id)});
        notify('Your rating has been credited', 'success')
      } else {
        await updateDoc(docPublicRef, {rating: book.rating + 1, usersWhoUnlikesBook: arrayRemove(user.id)});
        await updateDoc(docUserRef, {rating: book.rating + 1, usersWhoUnlikesBook: arrayRemove(user.id)});
        notify('Your rating has been deleted', 'success')
      }
      dispatch(fetchSeesBooksEveryone())
    } catch (e) {
      console.error(e)
      notify('An error occurred, please try again later', 'error')
    }
  }
)
