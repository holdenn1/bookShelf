import React from 'react';
import styles from './Book.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { IBook } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
import { setPublic } from '../../../store/actions/setPublic';
import { setFavoriteBook } from '../../../store/actions/setFavoriteBook';
import { setLikeBook } from '../../../store/actions/setLikeBook';
import { setUnlikeBook } from '../../../store/actions/setUnlikeBook';
import FavoriteIcon from './Icons/FavoriteIcon';
import PublicIcon from './Icons/PublicIcon';
import LikeIcon from './Icons/LikeIcon';
import UnlikeIcon from './Icons/UnlikeIcon';
import RemoveIcon from './Icons/RemoveIcon';
import MessageIcon from './Icons/MessageIcon';
import classNames from 'classnames';

function Book(book: IBook) {
	const { user, library } = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();
	const { isAuth, id } = useAuth();
	const checkCurrentUser = id === book.userId;

	const addFavoriteBook = async (book: IBook) => {
		dispatch(setFavoriteBook({ book, library, user }));
	};

	const setPublicBook = async (book: IBook) => {
		dispatch(setPublic({ book, library, user }));
	};

	const setLike = async (book: IBook) => {
		dispatch(setLikeBook({ isAuth, book, user }));
	};

	const setUnlike = async (book: IBook) => {
		dispatch(setUnlikeBook({ isAuth, book, user }));
	};

	return (
		<div key={book.id} className={styles.card}>
			<div className={styles.front}>
				<span className={styles.count}>{book.rating}⭐</span>
				<img src={book.cover} alt='' />
			</div>
			<div className={styles.back}>
				<h3 className={styles.title}>{book.title}</h3>
				<p className={styles.description}>{book.description}</p>
				<FavoriteIcon
					addFavoriteBook={addFavoriteBook}
					book={book}
					checkCurrentUser={checkCurrentUser}
					isAuth={isAuth}
				/>
				<PublicIcon
					setPublicBook={setPublicBook}
					book={book}
					checkCurrentUser={checkCurrentUser}
					isAuth={isAuth}
				/>
				<RemoveIcon book={book} user={user} checkCurrentUser={checkCurrentUser} isAuth={isAuth} />
				<div
					className={classNames(styles.bookPanel, { [styles.dontCurrentUser]: checkCurrentUser })}
				>
					<LikeIcon setLike={setLike} book={book} checkCurrentUser={checkCurrentUser} />
					<MessageIcon book={book} />
					<UnlikeIcon setUnlike={setUnlike} book={book} checkCurrentUser={checkCurrentUser} />
				</div>
			</div>
		</div>
	);
}

export default Book;
