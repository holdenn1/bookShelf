import {createAsyncThunk} from "@reduxjs/toolkit";
import {addDoc, collection, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {setFavorite, setLibrary} from "../slices/accountSlice";
import {fetchFavoriteBooks} from "./fetchFavoriteBooks";
import {fetchDataLibrary} from "./fetchDataLibrary";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";
import {SetFavoriteAndPublicProps} from "../../types";


export const setPublic = createAsyncThunk(
  'main/setPublic',
  async ({book, library, user}: SetFavoriteAndPublicProps, {dispatch}) => {
    try {
      const isPublic = library.map(item => {
          if (item.id == book.id) {
            return {
              ...item,
              seesEveryone: !item.seesEveryone,
            }
          }
          return item
        }
      )

      const docUserRef = doc(db, `books-user-${user.id}`, `${book.id}`);
      await updateDoc(docUserRef, {seesEveryone: !book.seesEveryone});

      dispatch(setLibrary(isPublic));
      dispatch(fetchFavoriteBooks(user))

      if (book.seesEveryone) {
        await deleteDoc(doc(db, "books-sees-everyone", `${book.booksEveryoneCollectionID}`));
      } else {
        const booksEveryoneCollection = await addDoc(collection(db, `books-sees-everyone`), {
          id: book.id,
          userId: user.id,
          title: book.title,
          description: book.description,
          cover: book.cover,
          favorite: book.favorite,
          seesEveryone: !book.seesEveryone,
          userWhoLikesBook: [],
          rating: 0
        });
        const docPublic = doc(db, `books-sees-everyone`, `${booksEveryoneCollection.id}`)
        await setDoc(docPublic, {booksEveryoneCollectionID: booksEveryoneCollection.id}, {merge: true});
        await setDoc(docUserRef, {booksEveryoneCollectionID: booksEveryoneCollection.id}, {merge: true});

        const setPublicBookIdItems = isPublic.map(item => {
          if (book.seesEveryone) {
            return {...item, booksEveryoneCollectionID: booksEveryoneCollection.id}
          }
          return item
        })

        const setPublicBookAndFavorite = isPublic.map(book => {
          if (book.favorite) {
            return {...book, booksEveryoneCollectionID: booksEveryoneCollection.id}
          }
          return book
        })

        const favorite = setPublicBookAndFavorite.filter(book => {
          if (book.favorite) {
            return book
          }
        })
        dispatch(setFavorite(favorite))
        dispatch(setLibrary(setPublicBookIdItems))
      }
      dispatch(fetchDataLibrary(user.id))
      dispatch(fetchSeesBooksEveryone())
    } catch (e) {
      console.error(e)
    }
  }
)