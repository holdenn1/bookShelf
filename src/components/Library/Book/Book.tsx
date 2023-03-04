import React from 'react';
import styles from './Book.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import favoriteIcon from './../../../img/icons/star-svgrepo-com.svg'
import {addBookToLibrary, IBook} from "../../../store/slices/accountSlice";
import {db} from "../../../firebase";
import {doc, setDoc} from "firebase/firestore";
import classNames from "classnames";

function Book(book: IBook) {
  const {user, library} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()

  const addFavoriteBook = async (book: IBook) => {
    console.log(book)
    const isFavorite = library.map(item => {
        if (item.id == book.id) {
          return {...item, favorite: !item.favorite}
        }
        return item
      }
    )

    dispatch(addBookToLibrary(isFavorite))
    const docRef = doc(db, `books-user-${user.id}`, `${book.id}`);
    await setDoc(docRef, {favorite: !book.favorite}, {merge: true});

  }

  console.log(book.favorite)


  return (
    <>
      <div key={book.id} className={styles.card}>
        <div className={styles.front}><img src={book.cover} alt=""/></div>
        <div className={styles.back}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.description}>{book.description}</p>
          <img
            onClick={() => addFavoriteBook(book)}
            className={classNames(styles.favoriteStar, {[styles.favorite]: book.favorite})}
            src={favoriteIcon}
            alt=""/>
        </div>
      </div>
    </>
  );
}

export default Book;