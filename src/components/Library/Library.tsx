import React from 'react';
import NavLibrary from '../NavLibrary/NavLibrary';
import NewBook from '../NewBook/NewBook';
import styles from './Libraty.module.scss';

export default function Library() {
	return (
		<div className={styles.wrapper}>
			<NavLibrary />
			<NewBook/>
		</div>
	);
}
