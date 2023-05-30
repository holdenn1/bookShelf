import React from 'react';
import styles from './styles.module.scss';
import { INavButtons } from '../../../../types';

function PrevButton({ step, setStep }: INavButtons) {
	return (
		<button type='button' className={styles.prevButton} onClick={() => setStep(step - 1)}>
			Prev
		</button>
	);
}

export default PrevButton;
