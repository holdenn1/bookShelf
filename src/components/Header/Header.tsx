import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import LinkToBookShelf from '../UI/formUI/Links/LinkToBookShelf';
import logIn from './../../img/icons/icons8-male-user-50.png';
import logOut from './../../img/icons/icons8-log-out-50.png';
import { useAuth } from '../../hooks/useAuth';
import LogOutButton from '../UI/formUI/Buttons/LogOutButton';

function Header() {
	const { isAuth } = useAuth();
	return (
		<header className={styles.header}>
			<Link to="/">BookShelf</Link>
			{isAuth ? (
				<LogOutButton>
					<img className={styles.userLink} src={logOut} alt="log-out" />
				</LogOutButton>
			) : (
				<LinkToBookShelf>
					<img className={styles.userLink} src={logIn} alt="log-in" />
				</LinkToBookShelf>
			)}
		</header>
	);
}

export default Header;
