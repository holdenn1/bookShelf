import styles from './styles.module.scss';
import { IChildren } from '@/types';

function BookshelfWrapper({ children }: IChildren) {
	return <div className={styles.bookshelfWrapper}>{children}</div>;
}

export default BookshelfWrapper;
