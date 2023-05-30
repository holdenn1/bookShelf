import React from 'react';
import styles from './WrapperFormAddingBook.module.scss';
import { IChildren } from '../../../../types';

function WrapperFormAddingBook({ children }: IChildren) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.formAddingBook}>{children}</div>
		</div>
	);
}

export default WrapperFormAddingBook;
