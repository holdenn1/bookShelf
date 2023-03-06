import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import Book from "../../components/Library/Book/Book";
import BookshelfWrapper from "../../components/UI/wrappers/BookshelfWrapper/BookshelfWrapper";
import LibraryTitle from "../../components/Library/LibraryTitle/LibraryTitle";
import {fetchDataLibrary} from "../../store/actions/fetchDataLibrary";
import {IBook} from "../../types";
import { setSearch} from "../../store/slices/accountSlice";

function AllBookPage() {
  const {user, library, search} = useAppSelector(state => state.account)
  const [searchBooks, setSearchBooks] = useState<IBook[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDataLibrary(user.id))
    dispatch(setSearch(''))
  }, [])

  function librarySearch() {
    const books = library.filter(book => book.title == search)
    setSearchBooks(books)
  }

  useEffect(() => {
    librarySearch()
  }, [search, library])

  return (
    <>
      {
        library.length === 0 ? (<LibraryTitle/>)
          : (
            <BookshelfWrapper>
              {searchBooks.length === 0 ?
                (
                  library.map(book => <Book key={book.id} {...book}/>)
                ) : (
                  searchBooks.map((book: IBook) => <Book key={book.id} {...book}/>)
                )
              }
            </BookshelfWrapper>
          )
      }
    </>
  );
}

export default AllBookPage;