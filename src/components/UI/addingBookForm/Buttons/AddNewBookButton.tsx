import React from 'react'
import styles from './styles.module.scss'
import {useAppDispatch} from "../../../../hooks/reduxHooks";
import {setVisibleAddingBookForm} from "../../../../store/slices/librarySlice";

export default function AddNewBookButton() {
  const dispatch = useAppDispatch()

  return (
    <button
      className={styles.addBookBtn}
      onClick={() => dispatch(setVisibleAddingBookForm(true))}
    >
      <span>
        Add Book
      </span>
    </button>
  )
}
