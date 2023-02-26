import React from 'react'
import WrapperFormAddingBook from "../../UI/addingBookForm/WrapperFormAddingBook/WrapperFormAddingBook";
import descriptionBook from '../../../img/icons/icons8-open-book-100.png'
import styles from './styles.module.scss'
import PrevButton from "../../UI/addingBookForm/Buttons/PrevButton";
import NextButton from "../../UI/addingBookForm/Buttons/NextButton";

export default function BookDescription() {
  return (
    <WrapperFormAddingBook>
      <img className={styles.img} src={descriptionBook} alt=""/>
      <h3 className={styles.text}>What can you say about this book?</h3>
      <textarea className={styles.descriptionBook} />
      <div className={styles.buttonContainer}>
        <PrevButton/>
        <NextButton/>
      </div>
    </WrapperFormAddingBook>
  )
}
