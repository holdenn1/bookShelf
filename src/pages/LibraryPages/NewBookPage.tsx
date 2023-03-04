import React from 'react';
import FormAddingBook from "../../components/Library/FormAddingBook/FormAddingBook";
import classNames from "classnames";
import styles from "./styles.module.scss";
import AddNewBookButton from "../../components/UI/addingBookForm/Buttons/AddNewBookButton";
import {useAppSelector} from "../../hooks/reduxHooks";

function NewBookPage() {
  const {visibleAddingBookForm} = useAppSelector(state => state.account)
  return (
    <>
      <div className={classNames(styles.wrapper, {[styles.visibleNewBookMessage]: visibleAddingBookForm})}>
        <h3 className={styles.title}>Would you like to add more books to the library?</h3>
        <AddNewBookButton/>
      </div>
      <FormAddingBook/>
    </>
  );
}

export default NewBookPage;