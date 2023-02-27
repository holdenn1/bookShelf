import React from 'react';
import AddingBook from '../AddingBook/AddingBook';
import NavLibrary from '../NavLibrary/NavLibrary';
import NewBook from '../NewBook/NewBook';
import styles from './Library.module.scss';

export default function Library() {
  return (
    <div className={styles.wrapper}>
      <NavLibrary/>
      <NewBook/>
      <AddingBook/>
    </div>
  );
}
