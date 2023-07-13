import { IChildren } from '@/types';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setVisibleMenu } from '@/store/slices/mainSlice';

function Main({ children }: IChildren) {
	const dispatch = useAppDispatch();

	return (
		<main onClick={() => dispatch(setVisibleMenu(false))} className={styles.main}>
			{children}
		</main>
	);
}

export default Main;
