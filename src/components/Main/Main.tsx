import React from 'react';
import styles from './Main.module.scss';
import { IChildren } from '../../types';
import { setVisibleMenu } from '../../store/slices/mainSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';

function Main({ children }: IChildren) {
	const dispatch = useAppDispatch();

	return (
		<main onClick={() => dispatch(setVisibleMenu(false))} className={styles.main}>
			{children}
		</main>
	);
}

export default Main;
