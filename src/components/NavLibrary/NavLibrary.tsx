import React from 'react'
import styles from './NavLibrary.module.scss'
import {NavLink} from 'react-router-dom'
import classNames from "classnames";

export default function NavLibrary() {
  const activeLink = ({isActive}: any) => isActive ? styles.activeLink : styles.bookItem

  return (
    <nav className={styles.nav}>
      <ul className={styles.bookList}>
        <NavLink className={activeLink} to='/book-shelf/new-book'>New
          book</NavLink>
        <NavLink className={activeLink} to='/book-shelf/all-books'>All books</NavLink>
        <NavLink className={activeLink} to='/book-shelf/favorite-books'>Favorite
          books</NavLink>
      </ul>
    </nav>
  )
}
