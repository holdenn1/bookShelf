import React from 'react'
import styles from './NewBook.module.scss'
import AddNewBookButton from "../UI/addingBookForm/Buttons/AddNewBookButton";
export default function NewBook() {
	return (
		<div className={styles.wrapper}>
				<h3 className={styles.title}>It's still empty here</h3>
				<p className={styles.description}>Add a new book?</p>
				<AddNewBookButton/>
			</div>
	)
}
