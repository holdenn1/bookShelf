import React from 'react'
import styles from './NavLibrary.module.scss'
export default function NavLibrary() {
	return (
		<nav className={styles.nav}>
				<ul className={styles.bookList}>
					<li className={styles.bookItem}>New book</li>
					<li className={styles.bookItem}>All books</li>
					<li className={styles.bookItem}>Favorite books</li>
				</ul>
			</nav>
	)
}
