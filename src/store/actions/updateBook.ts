import { InitialValuesUpdateBook } from "@/components/Library/Book";
import { db } from "@/firebase";
import { IBook, IUser } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { fetchDataLibrary } from "./fetchDataLibrary";
import { fetchFavoriteBooks } from "./fetchFavoriteBooks";
import { fetchSeesBooksEveryone } from "./fetchSeesBooksEveryone";

type UpdateBookProps = {
  user: IUser;
  book: IBook;
  values: InitialValuesUpdateBook;
};

export const updateBook = createAsyncThunk<void, UpdateBookProps>(
  "user/updateBook",
  async ({ user, book, values }, { dispatch }) => {
    const userCollectionBookRef = doc(
      db,
      `books-user-${user.id}`,
      `${book.id}`
    );
    const booksEveryoneCollectionBookRef = doc(
      db,
      `books-sees-everyone`,
      `${book.booksEveryoneCollectionID}`
    );
    if (values.title) {
      await setDoc(
        userCollectionBookRef,
        {
          title: values.title,
        },
        { merge: true }
      );
      await setDoc(
        booksEveryoneCollectionBookRef,
        {
          title: values.title,
        },
        { merge: true }
      );
    } else if (values.description) {
      await setDoc(
        userCollectionBookRef,
        {
          description: values.description,
        },
        { merge: true }
      );
      await setDoc(
        booksEveryoneCollectionBookRef,
        {
          description: values.description,
        },
        { merge: true }
      );
    }
    dispatch(fetchDataLibrary(user.id));
    dispatch(fetchSeesBooksEveryone());
    dispatch(fetchFavoriteBooks(user));
  }
);
