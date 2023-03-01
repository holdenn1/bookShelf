import React from 'react';
import styles from './Book.module.scss'
import {useAppSelector} from "../../hooks/reduxHooks";

function Book() {
  const {library} = useAppSelector(state => state.account)

  return (
    <>{
      library.map(book => (
        <div key={book.id} className={styles.card}>
          <div className={styles.front}><img src={book.cover} alt=""/></div>
          <div className={styles.back}>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.description}>{book.description}</p>
          </div>
        </div>
      ))
    }</>
  );
}

export default Book;