import React from 'react'
import styles from './NewBook.module.scss'
import AddNewBookButton from "../UI/addingBookForm/Buttons/AddNewBookButton";
import {useAppSelector} from "../../hooks/reduxHooks";
import classNames from "classnames";

export default function NewBook() {
  const {visibleAddingBookForm} = useAppSelector(state => state.library)
  return (
    <div className={classNames(styles.wrapper, {[styles.visibleNewBookMessage]: visibleAddingBookForm}) }>
      <h3 className={styles.title}>It's still empty here</h3>
      <p className={styles.description}>Add a new book?</p>
      <AddNewBookButton/>
    </div>
  )
}
