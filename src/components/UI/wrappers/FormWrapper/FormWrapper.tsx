import React from 'react';
import { IChildren } from '../../../../types';
import styles from './styles.module.scss';

function FormWrapper({ children }: IChildren) {
	return <div className={styles.wrapper}>{children}</div>;
}

export default FormWrapper;
