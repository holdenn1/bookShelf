import React from 'react'
import styles from "./styles.module.scss";
import coverBook from '../../../img/icons/icons8-book-96.png'

export default function BookCover() {
  return (
    <>
      <img src={coverBook} alt=""/>
      <h3 className={styles.text}>Add a cover!</h3>
      <p className={styles.titleDescription}>It will make your library more convenient and stylish!</p>
    </>
  )
}
