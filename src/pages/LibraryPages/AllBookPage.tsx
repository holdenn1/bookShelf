import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import Book from "../../components/Library/Book/Book";
import BookshelfWrapper from "../../components/UI/wrappers/BookshelfWrapper/BookshelfWrapper";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {addBookToLibrary} from "../../store/slices/accountSlice";
import LibraryTitle from "../../components/Library/LibraryTitle/LibraryTitle";

function AllBookPage() {
  const {user, library} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()


  const fetchDataLibrary = async () => {
    const querySnapshot = await getDocs(collection(db, `books-user-${user.id}`))
    const data: any = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    dispatch(addBookToLibrary(data))

  }

  useEffect(() => {
    fetchDataLibrary();
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