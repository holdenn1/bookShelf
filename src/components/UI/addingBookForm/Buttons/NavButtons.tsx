import React from 'react';
import styles from './styles.module.scss';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import SubmitButton from './SubmitButton';
import { INavButtons } from '../../../../types';

function NavButtons({ step, setStep }: INavButtons) {
	return (
		<div className={styles.buttonContainer}>
			{step > 0 && <PrevButton step={step} setStep={setStep} />}
			{step === 0 || step <= 1 ? <NextButton /> : <SubmitButton />}
		</div>
	);
}

export default NavButtons;
