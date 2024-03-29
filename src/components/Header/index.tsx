import styles from './styles.module.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import menuBtn from '@/img/icons/icons8-menu-50.png';
import logIn from '@/img/icons/icons8-male-user-50.png';
import logOut from '@/img/icons/icons8-log-out-50.png';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setOpenSearchMenu, setVisibleMenu } from '@/store/slices/mainSlice';
import LogOutButton from '../UI/formUI/Buttons/LogOutButton';
import LinkToBookShelf from '../UI/formUI/Links/LinkToBookShelf';

function Header() {
	const { isAuth } = useAuth();
	const dispatch = useAppDispatch();
	const { visibleMenu } = useAppSelector((state) => state.main);
	const location = useLocation();
	const showMenu = location.pathname.startsWith('/book-shelf/');

	const handleMenu = () => {
		dispatch(setVisibleMenu(!visibleMenu));
		dispatch(setOpenSearchMenu(false));
	};

	return (
		<header className={styles.header}>
			<Link to='/'>BookShelf</Link>
			{isAuth ? (
				<LogOutButton>
					<img className={styles.userLink} src={logOut} alt='log-out' />
				</LogOutButton>
			) : (
				<LinkToBookShelf>
					<img className={styles.userLink} src={logIn} alt='log-in' />
				</LinkToBookShelf>
			)}
			<img
				onClick={handleMenu}
				className={classNames(styles.menuBtn, { [styles.showMenu]: showMenu })}
				src={menuBtn}
				alt=''
			/>
		</header>
	);
}

export default Header;
