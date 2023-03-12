import React, {useEffect} from 'react';
import styles from './styles.module.scss'
import BookshelfWrapper from "../../components/UI/wrappers/BookshelfWrapper/BookshelfWrapper";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {fetchSeesBooksEveryone} from "../../store/actions/fetchSeesBooksEveryone";
import Book from "../../components/Library/Book/Book";

function LibraryPage() {
  const {booksSeesEveryone} = useAppSelector(state => state.main)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSeesBooksEveryone())
  }, [])

  return (
    <>
      {booksSeesEveryone.length === 0 ? (
        <div className={styles.wrapper}>
          <h3>It's empty for now, come back later</h3>
        </div>
      ) : (
        <BookshelfWrapper>
          {booksSeesEveryone.map(book => <Book key={book.id} {...book}/>)}
        </BookshelfWrapper>
      )}
    </>

  );
}

export default LibraryPage;