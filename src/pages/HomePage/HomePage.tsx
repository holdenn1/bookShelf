import React from 'react';
import styles from './styles.module.scss';
import LinkToBookShelf from '../../components/UI/formUI/Links/LinkToBookShelf';
import { useAuth } from '../../hooks/useAuth';

function HomePage() {
	const { isAuth } = useAuth();

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>
				{' '}
				{isAuth ? 'Back to the library?' : 'Create your own library!'}
			</h1>

			<LinkToBookShelf>
				<span className={styles.start}>
					{isAuth ? 'Сontinue' : 'Start now'}
				</span>
			</LinkToBookShelf>
		</div>
	);
}

export default HomePage;
