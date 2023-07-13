import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import styles from './../styles.module.scss';
import massage from '@/img/icons/icons8-edit-message-24.png';
import { useAuth } from '@/hooks/useAuth';
import { notify } from '@/components/UI/Toast';
import { setCurrentBook, setVisibleMessageForm } from '@/store/slices/mainSlice';
import { IBook } from '@/types';

interface IMessageIconProps {
	book: IBook;
}

function MessageIcon({ book }: IMessageIconProps) {
	const { visibleMessageForm } = useAppSelector((state) => state.main);
	const { id } = useAppSelector((state) => state.account.user);
	const { isAuth } = useAuth();
	const dispatch = useAppDispatch();

	const handleMassage = () => {
		const checkUserLike = book.usersWhoSendMessage.some((userId) => userId === id);
		if (!isAuth) {
			notify('Only registered users can write messages', 'error');
			return;
		}
		if (!checkUserLike) {
			dispatch(setVisibleMessageForm(!visibleMessageForm));
			dispatch(setCurrentBook(book));
		} else {
			notify(
				'Your message has been sent to the author, please go to the message section to continue communication',
				'success',
			);
		}
	};
	return <img onClick={handleMassage} className={styles.messageForUser} src={massage} alt='' />;
}

export default MessageIcon;
