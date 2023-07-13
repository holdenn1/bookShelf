import classNames from 'classnames';
import deleteIcon from '@/img/icons/icons8-delete-24.png';
import styles from './../styles.module.scss';
import { BookIconProps, IUser } from '@/types';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { removeBook } from '@/store/actions/removeBook';

type DeleteIconProps = BookIconProps & {
	user: IUser;
};

function RemoveIcon({ book, isAuth, checkCurrentUser, user }: DeleteIconProps) {
	const dispatch = useAppDispatch();
	return (
		<img
			onClick={() => dispatch(removeBook({ book, user }))}
			className={classNames(
				styles.delete,
				{ [styles.isAuth]: !isAuth },
				{ [styles.dontCurrentUser]: !checkCurrentUser },
			)}
			src={deleteIcon}
			alt=''
		/>
	);
}

export default RemoveIcon;
