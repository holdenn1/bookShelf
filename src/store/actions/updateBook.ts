import { db, realTimeDb } from "@/firebase";
import { IBook, IChats, IUser } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { fetchDataLibrary } from "./fetchDataLibrary";
import { fetchFavoriteBooks } from "./fetchFavoriteBooks";
import { fetchSeesBooksEveryone } from "./fetchSeesBooksEveryone";
import { ref, update } from "firebase/database";
import { InitialValuesUpdateBook } from "@/components/Forms/EditBookForm";

type UpdateBookProps = {
  user: IUser;
  book: IBook;
  values: InitialValuesUpdateBook;
  updatedBook: IChats;
};

export const updateBook = createAsyncThunk<void, UpdateBookProps>(
  "user/updateBook",
  async ({ user, book, values, updatedBook }, { dispatch }) => {
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

    const firstUserRef = ref(
      realTimeDb,
      `users/${user.id}/chats/${updatedBook.secondUserChatId}`
    );
    const secondUserRef = ref(
      realTimeDb,
      `users/${updatedBook.fromUserId}/chats/${updatedBook.firstUserChatId}`
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
      const updatedData = {
        bookTitle: values.title,
      };

      await update(firstUserRef, updatedData);
      await update(secondUserRef, updatedData);
    }
    if (values.description) {
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
