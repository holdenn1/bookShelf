import React from 'react';
import styles from './Book.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import favoriteIcon from './../../../img/icons/star-svgrepo-com.svg'
import publicImg from '../../../img/icons/icons8-public-30.png'
import like from '../../../img/icons/icons8-thumbs-up-24.png'
import unlike from '../../../img/icons/icons8-thumbs-down-24.png'
import {setFavorite, setLibrary} from "../../../store/slices/accountSlice";
import classNames from "classnames";
import {fetchFavoriteBooks} from "../../../store/actions/fetchFavoriteBooks";
import {collection, doc, setDoc, deleteDoc, addDoc, updateDoc, arrayUnion,arrayRemove } from "firebase/firestore";
import {db} from "../../../firebase";
import {IBook} from "../../../types";
import {fetchSeesBooksEveryone} from "../../../store/actions/fetchSeesBooksEveryone";
import {useAuth} from "../../../hooks/useAuth";
import {fetchDataLibrary} from "../../../store/actions/fetchDataLibrary";
import {notify} from "../../UI/Toast/Toast";

function Book(book: IBook) {
  const {user, library} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()
  const {isAuth, id} = useAuth();
  const checkCurrentUser = id === book.userId;


  const addFavoriteBook = async (book: IBook) => {
    try {
      const isFavorite = library.map(item => {
          if (item.id == book.id) {
            return {...item, favorite: !item.favorite}
          }
          return item
        }
      )

      dispatch(setLibrary(isFavorite))

      const docUserRef = doc(db, `books-user-${user.id}`, `${book.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
      await updateDoc(docUserRef, {favorite: !book.favorite});

      if (book.seesEveryone) {
        await updateDoc(docPublicRef, {favorite: !book.favorite});
      }
      dispatch(fetchSeesBooksEveryone())
      dispatch(fetchFavoriteBooks(user))
    } catch (e) {
      console.error(e)
    }
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
      dispatch(fetchFavoriteBooks(user))

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
          userWhoLikesBook: [],
          rating: 0
        });
        const docPublic = doc(db, `books-sees-everyone`, `${booksEveryoneCollection.id}`)
        await setDoc(docPublic, {booksEveryoneCollectionID: booksEveryoneCollection.id}, {merge: true});
        await setDoc(docUserRef, {booksEveryoneCollectionID: booksEveryoneCollection.id}, {merge: true});

        const setPublicBookIdItems = isPublic.map(item => {
          if (book.seesEveryone) {
            return {...item, booksEveryoneCollectionID: booksEveryoneCollection.id}
          }
          return item
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
        dispatch(setFavorite(favorite))
        dispatch(setLibrary(setPublicBookIdItems))
      }
      dispatch(fetchDataLibrary(user.id))
      dispatch(fetchSeesBooksEveryone())
    } catch (e) {
      console.error(e)
    }
  }

  const setLike = async (book: IBook) => {
    if(!isAuth){
      notify('Only registered users can rate')
      return
    }
    const checkUserLike = book.userWhoLikesBook.some(id => id === user.id)
    if (!checkUserLike) {
      const docUserRef = doc(db, `books-user-${book.userId}`, `${book.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
      await updateDoc(docPublicRef, {rating: book.rating + 1, userWhoLikesBook: arrayUnion(user.id)});
      await updateDoc(docUserRef, {rating: book.rating + 1, userWhoLikesBook: arrayUnion(user.id)});
    }else {
      notify('You have already rated')
    }
    dispatch(fetchSeesBooksEveryone())
  }

  const setUnlike = async (book: IBook) => {
    if(!isAuth){
      notify('Only registered users can rate')
      return
    }
    const checkUserLike = book.userWhoLikesBook.some(id => id === user.id)
    if (checkUserLike){
      const docUserRef = doc(db, `books-user-${book.userId}`, `${book.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${book.booksEveryoneCollectionID}`)
      await updateDoc(docPublicRef, {rating: book.rating - 1, userWhoLikesBook: arrayRemove(user.id)});
      await updateDoc(docUserRef, {rating: book.rating - 1, userWhoLikesBook: arrayRemove(user.id)});
    }else {
      notify('You have not rated yet')
    }
    dispatch(fetchSeesBooksEveryone())
  }

  return (
    <>
      <div key={book.id} className={styles.card}>

        <div className={styles.front}>
          <span className={styles.count}>{book.rating}⭐</span>
          <img src={book.cover} alt=""/></div>
        <div className={styles.back}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.description}>{book.description}</p>
          <img
            onClick={() => addFavoriteBook(book)}
            className={classNames(styles.favoriteStar,
              {[styles.isAuth]: !isAuth},
              {[styles.dontCurrentUser]: !checkCurrentUser},
              {[styles.favoriteActive]: book.favorite}
            )}
            src={favoriteIcon}
            alt=""/>
          <img
            onClick={() => setPublicBook(book)}
            className={classNames(styles.publicImg,
              {[styles.isAuth]: !isAuth},
              {[styles.dontCurrentUser]: !checkCurrentUser},
              {[styles.publicActive]: book.seesEveryone})}
            src={publicImg}
            alt=""/>
          <img
            onClick={() => setLike(book)}
            className={classNames(styles.like,
              {[styles.dontCurrentUser]: checkCurrentUser}
            )}
            src={like}
            alt=""/>
          <img
            onClick={() => setUnlike(book)}
            className={classNames(styles.unlike,
              {[styles.dontCurrentUser]: checkCurrentUser}
            )}
            src={unlike}
            alt=""/>
        </div>
      </div>
    </>
  );
}

export default Book;