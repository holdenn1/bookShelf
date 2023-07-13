import { IChildren } from '@/types';
import styles from './styles.module.scss';

function ButtonForm({ children }: IChildren) {
	return (
		<button type='submit' className={styles.formButton}>
			{children}
		</button>
	);
}

export default ButtonForm;
