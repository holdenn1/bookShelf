import React from 'react'
import styles from './AddingBook.module.scss'
import AddNewBookButton from "../UI/addingBookForm/Buttons/AddNewBookButton";
import {useAppSelector} from "../../hooks/reduxHooks";
import classNames from "classnames";

interface ITitle {
  title: string
}

export default function AddingBook({title}: ITitle) {
  const {visibleAddingBookForm} = useAppSelector(state => state.account)

  return (
    <div className={classNames(styles.wrapper, {[styles.visibleNewBookMessage]: visibleAddingBookForm})}>
      <h3 className={styles.title}>{title}</h3>
      <AddNewBookButton/>
    </div>
  )
}
