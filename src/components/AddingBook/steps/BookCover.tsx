import React from 'react'
import styles from "./styles.module.scss";
import WrapperFormAddingBook from "../../UI/addingBookForm/WrapperFormAddingBook/WrapperFormAddingBook";
import coverBook from '../../../img/icons/icons8-book-96.png'
import PrevButton from "../../UI/addingBookForm/Buttons/PrevButton";
import NextButton from "../../UI/addingBookForm/Buttons/NextButton";

export default function BookCover() {
  return (
    <WrapperFormAddingBook>
      <img src={coverBook} alt=""/>
      <h3 className={styles.text}>Add a cover!</h3>
      <div className={styles.buttonContainer}>
        <PrevButton/>
        <NextButton/>
      </div>
    </WrapperFormAddingBook>
  )
}
