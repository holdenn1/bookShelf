import React from 'react'
import styles from "./styles.module.scss";
import titleBook from "../../../img/icons/icons8-literature-64.png";
import WrapperFormAddingBook from "../../UI/addingBookForm/WrapperFormAddingBook/WrapperFormAddingBook";
import NextButton from "../../UI/addingBookForm/Buttons/NextButton";

export default function BookTitle() {
  return (
    <WrapperFormAddingBook>
      <img className={styles.img} src={titleBook} alt=""/>
      <h3 className={styles.text}>What is the title of the book?</h3>
      <input className={styles.titleBook} type="text" placeholder='Title book'/>
      <NextButton/>
    </WrapperFormAddingBook>
  )
}
