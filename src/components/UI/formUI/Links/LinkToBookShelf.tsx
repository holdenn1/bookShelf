import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { IChildren } from '@/types';
import { useAuth } from '@/hooks/useAuth';

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
