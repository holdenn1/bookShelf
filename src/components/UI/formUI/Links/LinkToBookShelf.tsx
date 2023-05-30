import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { IChildren } from '../../../../types';
import styles from './styles.module.scss';

export default function LinkToBookShelf({ children }: IChildren) {
	const { isAuth } = useAuth();
	return (
		<>
			{isAuth ? (
				<Link className={styles.linkToBookShelf} to='book-shelf/all-books'>
					{children}
				</Link>
			) : (
				<Link className={styles.linkToBookShelf} to='sign-in'>
					{children}
				</Link>
			)}
		</>
	);
}
