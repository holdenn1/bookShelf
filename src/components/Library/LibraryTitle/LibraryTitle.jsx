import React from 'react';
import styles from './LibraryTitle.module.scss';
import { Link } from 'react-router-dom';

function LibraryTitle() {
	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>It`s still empty here</h3>
			<Link className={styles.addBook} to='/book-shelf/new-book'>
				New Book
			</Link>
		</div>
	);
}

export default LibraryTitle;
