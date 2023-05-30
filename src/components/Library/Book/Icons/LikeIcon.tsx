import React from 'react';
import classNames from 'classnames';
import styles from '../Book.module.scss';
import like from '../../../../img/icons/icons8-thumbs-up-24.png';
import { BookIconProps, IBook } from '../../../../types';

type LikeIconProps = BookIconProps & {
	setLike(book: IBook): Promise<void>;
};

function LikeIcon({ setLike, book, checkCurrentUser }: LikeIconProps) {
	return (
		<img
			onClick={() => setLike(book)}
			className={classNames(styles.like, { [styles.dontCurrentUser]: checkCurrentUser })}
			src={like}
			alt=''
		/>
	);
}

export default LikeIcon;
