import React, { useEffect } from 'react';
import styles from './NavLibrary.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import searchIcon from './../../../img/icons/icons8-поиск.svg';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setOpenSearchMenu, setSearch } from '../../../store/slices/mainSlice';

export default function NavLibrary() {
	const activeLink = ({ isActive }: any) => (isActive ? styles.activeLink : styles.link);
	const { search, visibleMenu, isOpenSearchMenu } = useAppSelector((state) => state.main);
	const dispatch = useAppDispatch();
	const location = useLocation();

	useEffect(() => {
		location.pathname !== '/book-shelf/all-books' && dispatch(setOpenSearchMenu(false));
	}, [location.pathname]);

	return (
		<nav
			onClick={(e) => e.stopPropagation()}
			className={classNames(styles.nav, { [styles.navActive]: visibleMenu })}
		>
			<ul className={styles.bookList}>
				<li className={styles.bookItem}>
					<NavLink className={activeLink} to='/book-shelf/new-book'>
						New book
					</NavLink>
				</li>
				<li className={styles.bookItem}>
					<NavLink className={activeLink} to='/book-shelf/all-books'>
						All books
					</NavLink>
					<img
						onClick={() => dispatch(setOpenSearchMenu(!isOpenSearchMenu))}
						className={styles.searchBtn}
						src={searchIcon}
						alt=''
					/>
				</li>
				<li
					className={classNames(styles.searchContainer, {
						[styles.searchActive]: isOpenSearchMenu && visibleMenu,
					})}
				>
					<input
						className={classNames(styles.search)}
						value={search}
						onChange={(e) => dispatch(setSearch(e.target.value.toLocaleLowerCase()))}
						type='text'
					/>
				</li>
				<li className={styles.bookItem}>
					<NavLink className={activeLink} to='/book-shelf/favorite-books'>
						Favorite books
					</NavLink>
				</li>
				<li className={styles.bookItem}>
					<NavLink className={activeLink} to='/book-shelf/messages'>
						Messages
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
