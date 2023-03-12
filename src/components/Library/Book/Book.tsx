import React from 'react';
import styles from './Book.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import favoriteIcon from './../../../img/icons/star-svgrepo-com.svg'
import publicImg from '../../../img/icons/icons8-public-30.png'
import {setFavorite, setLibrary} from "../../../store/slices/accountSlice";
import classNames from "classnames";
import {fetchFavoriteBooks} from "../../../store/actions/fetchFavoriteBooks";
import {collection, doc, setDoc, deleteDoc, addDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {IBook} from "../../../types";
import {setBooksEveryone} from "../../../store/slices/mainSlice";
import {fetchSeesBooksEveryone} from "../../../store/actions/fetchSeesBooksEveryone";
import {useAuth} from "../../../hooks/useAuth";

function Book(book: IBook) {
  const {user, library} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()
  const {isAuth} = useAuth();

  const addFavoriteBook = async (book: IBook) => {
    const isFavorite = library.map(item => {
        if (item.id == book.id) {
          return {...item, favorite: !item.favorite}
        }
        return item
      }
    )

    const publicAndIsFavoriteBooks = isFavorite.filter(book => {
      if (book.favorite && book.seesEveryone) {
        return book
      } else {
        return book.seesEveryone
      }
    })
    dispatch(setLibrary(isFavorite))
    dispatch(setBooksEveryone(publicAndIsFavoriteBooks));
    const docUserRef = doc(db, `books-user-${user.id}`, `${book.id}`);
    const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
    await updateDoc(docUserRef, {favorite: !book.favorite});
    if (book.seesEveryone) {
      await updateDoc(docPublicRef, {favorite: !book.favorite});
    }
    dispatch(fetchFavoriteBooks(user))
  }

  const setPublicBook = async (book: IBook) => {
    try {
      const isPublic = library.map(item => {
          if (item.id == book.id) {
            return {
              ...item,
              seesEveryone: !item.seesEveryone,
            }
          }
          return item
        }
      )

      const docUserRef = doc(db, `books-user-${user.id}`, `${book.id}`);
      await updateDoc(docUserRef, {seesEveryone: !book.seesEveryone});
      dispatch(setLibrary(isPublic));

      const publicBook = isPublic.filter(book => book.seesEveryone === true)
      dispatch(setBooksEveryone(publicBook));

      const favoriteBook = isPublic.filter(book => {
        if (book.favorite && book.seesEveryone) {
          return book
        } else {
          return book.favorite
        }
      })

      dispatch(setFavorite(favoriteBook))

      if (book.seesEveryone) {
        await deleteDoc(doc(db, "books-sees-everyone", `${book.booksEveryoneCollectionID}`));
      } else {
        const booksEveryoneCollection = await addDoc(collection(db, `books-sees-everyone`), {
          id: book.id,
          userId: user.id,
          title: book.title,
          description: book.description,
          cover: book.cover,
          favorite: book.favorite,
          seesEveryone: !book.seesEveryone,
        });
        const docPublic = doc(db, `books-sees-everyone`, `${booksEveryoneCollection.id}`)
        await setDoc(docPublic, {booksEveryoneCollectionID: booksEveryoneCollection.id}, {merge: true});
        await setDoc(docUserRef, {booksEveryoneCollectionID: booksEveryoneCollection.id}, {merge: true});
        const setPublicBookIdItems = isPublic.map(item => {
          return {...item, booksEveryoneCollectionID: booksEveryoneCollection.id}
        })
        const setPublicBookAndFavorite = isPublic.map(book => {
          if (book.favorite) {
            return {...book, booksEveryoneCollectionID: booksEveryoneCollection.id}
          }
          return book
        })

        const favorite = setPublicBookAndFavorite.filter(book => {
          if (book.favorite) {
            return book
          }
        })

        dispatch(setLibrary(setPublicBookIdItems))
        dispatch(setFavorite(favorite))
      }
      dispatch(fetchSeesBooksEveryone())
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <>
      <div key={book.id} className={styles.card}>
        <div className={styles.front}><img src={book.cover} alt=""/></div>
        <div className={styles.back}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.description}>{book.description}</p>
          <img
            onClick={() => addFavoriteBook(book)}
            className={classNames(styles.favoriteStar,
              {[styles.isAuth]: !isAuth},
              {[styles.favoriteActive]: book.favorite}
            )}
            src={favoriteIcon}
            alt=""/>
          <img
            onClick={() => setPublicBook(book)}
            className={classNames(styles.publicImg,
              {[styles.isAuth]: !isAuth},
              {[styles.publicActive]: book.seesEveryone})}
            src={publicImg}
            alt=""/>
        </div>
      </div>
    </>
  );
}

export default Book;