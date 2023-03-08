import React, {useEffect} from 'react';
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
    <BookshelfWrapper>
      {booksSeesEveryone.map(book => <Book key={book.id} {...book}/>)}
    </BookshelfWrapper>
  );
}

export default LibraryPage;