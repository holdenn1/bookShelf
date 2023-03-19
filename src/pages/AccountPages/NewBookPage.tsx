import React from 'react';
import AddingBookForm from "../../components/Forms/AddingBookForm/AddingBookForm";
import classNames from "classnames";
import styles from "./styles.module.scss";
import AddNewBookButton from "../../components/UI/addingBookForm/Buttons/AddNewBookButton";
import {useAppSelector} from "../../hooks/reduxHooks";
import Loader from "../../components/UI/Loader/Loader";

export default function NewBookPage() {
  const {visibleAddingBookForm} = useAppSelector(state => state.main)
  const {loading,error} = useAppSelector(state => state.account)

  return (
    <>
      <div className={classNames(styles.wrapper, {[styles.visibleNewBookMessage]: visibleAddingBookForm})}>
        {loading ? (<Loader/>) :
          (
            <>
              <h3 className={styles.title}>Would you like to add more books to the library?</h3>
              <AddNewBookButton/>
              <p className={styles.error}>{error}</p>
            </>
          )
        }
      </div>
      <AddingBookForm/>
    </>
  );
}

