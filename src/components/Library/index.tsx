import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import NavLibrary from './NavLibrary';

export default function Library() {
	return (
		<div className={styles.wrapper}>
			<NavLibrary />
			<Outlet />
		</div>
	);
}
