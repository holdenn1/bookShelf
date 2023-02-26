import React from 'react'
import AddNewBookButtn from '../UI/formUI/Buttons/AddNewBookButton'
import styles from './NewBook.module.scss'
export default function NewBook() {
	return (
		<div className={styles.wrapper}>
				<h3 className={styles.title}>It's still empty here</h3>
				<p className={styles.description}>Add a new book?</p>
				<AddNewBookButtn />
			</div>
	)
}
