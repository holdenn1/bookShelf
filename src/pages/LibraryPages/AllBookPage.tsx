import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import Book from "../../components/Library/Book/Book";
import BookshelfWrapper from "../../components/UI/wrappers/BookshelfWrapper/BookshelfWrapper";
import LibraryTitle from "../../components/Library/LibraryTitle/LibraryTitle";
import {fetchDataLibrary} from "../../store/actions/fetchDataLibrary";

function AllBookPage() {
  const {user, library} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(fetchDataLibrary(user.id))
  }, [])


  return (
    <>
      {
        library.length === 0 ? (<LibraryTitle/>)
          : (
            <BookshelfWrapper>
              {library.map(book => <Book key={book.id} {...book}/>)}
            </BookshelfWrapper>
          )
      }
    </>
  );
}

export default AllBookPage;