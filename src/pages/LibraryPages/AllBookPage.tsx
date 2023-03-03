import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import Book from "../../components/Book/Book";
import BookshelfWrapper from "../../components/UI/BookshelfWrapper/BookshelfWrapper";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {addBook} from "../../store/slices/accountSlice";
import styles from "../../components/AddingBook/AddingBook.module.scss";
import {Link} from "react-router-dom";

function AllBookPage() {
  const {user, library} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()


  const fetchDataLibrary = async () => {
    await getDocs(collection(db, `books-user-${user.id}`))
      .then((querySnapshot) => {
        const data: any = querySnapshot.docs
          .map((doc) => ({...doc.data(), id: doc.id}));
        dispatch(addBook(data))
      })
  }

  useEffect(() => {
    fetchDataLibrary();
  }, [])


  return (
    <>
      {
        library.length === 0 ? (
            <div className={styles.wrapper}>
              <h3 className={styles.title}>It`s still empty here</h3>
              <Link className={styles.addBook} to='/book-shelf/new-book'>New Book</Link>
            </div>
          )
          : (
            <BookshelfWrapper>
              <Book/>
            </BookshelfWrapper>
          )
      }
    </>
  );
}

export default AllBookPage;