import React from 'react';
import styles from './BookshelfWraper.module.scss';
import { IChildren } from '../../../../types';

function BookshelfWrapper({ children }: IChildren) {
	return <div className={styles.bookshelfWrapper}>{children}</div>;
}

export default BookshelfWrapper;
