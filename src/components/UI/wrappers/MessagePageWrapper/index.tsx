import styles from './styles.module.scss';
import { IChildren } from '@/types';

function MessagePageWrapper({ children }: IChildren) {
	return <div className={styles.wrapper}>{children}</div>;
}

export default MessagePageWrapper;
