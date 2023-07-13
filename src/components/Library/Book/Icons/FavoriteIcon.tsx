import classNames from 'classnames';
import favoriteIcon from '@/img/icons/star-svgrepo-com.svg';
import styles from './../styles.module.scss';
import { BookIconProps, IBook } from '@/types';

type FavoriteIconProps = BookIconProps & {
	addFavoriteBook(book: IBook): Promise<void>;
};

function FavoriteIcon({ addFavoriteBook, book, isAuth, checkCurrentUser }: FavoriteIconProps) {
	return (
		<img
			onClick={() => addFavoriteBook(book)}
			className={classNames(
				styles.favoriteStar,
				{ [styles.isAuth]: !isAuth },
				{ [styles.dontCurrentUser]: !checkCurrentUser },
				{ [styles.favoriteActive]: book.favorite },
			)}
			src={favoriteIcon}
			alt=''
		/>
	);
}

export default FavoriteIcon;
