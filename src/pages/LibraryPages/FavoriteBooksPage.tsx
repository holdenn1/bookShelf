import React, {useEffect} from 'react';
import BookshelfWrapper from "../../components/UI/wrappers/BookshelfWrapper/BookshelfWrapper";
import LibraryTitle from "../../components/Library/LibraryTitle/LibraryTitle";
import Book from "../../components/Library/Book/Book";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {addBookToFavorite, addBookToLibrary} from "../../store/slices/accountSlice";

function FavoriteBooksPage() {
  const {favoriteBooks, user} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()


  const fetchDataLibrary = async () => {
    const q = query(collection(db, `books-user-${user.id}`), where("favorite", "==", true));
    const querySnapshot = await getDocs(q);
    const data:any = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    dispatch(addBookToFavorite(data))
  }

  useEffect(() => {
    fetchDataLibrary();
  }, [])

  return (
    <>
      {
        favoriteBooks.length == 0 ? (<LibraryTitle/>)
          : (
            <BookshelfWrapper>
              {favoriteBooks.map(book => <Book key={book.id} {...book}/>)}
            </BookshelfWrapper>
          )
      }
    </>

  );
}

export default FavoriteBooksPage;