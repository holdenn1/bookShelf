import classNames from 'classnames';
import styles from './../styles.module.scss';
import unlike from '@/img/icons/icons8-thumbs-down-24.png';
import { BookIconProps, IBook } from '@/types';

type FavoriteIconProps = BookIconProps & {
	setUnlike(book: IBook): Promise<void>;
};

function UnlikeIcon({ setUnlike, book, checkCurrentUser }: FavoriteIconProps) {
	return (
		<img
			onClick={() => setUnlike(book)}
			className={classNames(styles.unlike, { [styles.dontCurrentUser]: checkCurrentUser })}
			src={unlike}
			alt=''
		/>
	);
}

export default UnlikeIcon;
