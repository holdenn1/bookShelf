import React from 'react';
import { Outlet } from 'react-router-dom';
import NavLibrary from './NavLibrary/NavLibrary';
import styles from './Library.module.scss';

export default function Library() {
	return (
		<div className={styles.wrapper}>
			<NavLibrary />
			<Outlet />
		</div>
	);
}
