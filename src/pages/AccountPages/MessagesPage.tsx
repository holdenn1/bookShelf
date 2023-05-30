import React, { useEffect } from 'react';
import ChatList from '../../components/Library/Chat/ChatList/ChatList';
import { Outlet } from 'react-router-dom';
import MessagePageWrapper from '../../components/UI/wrappers/MessagePageWrapper/MessagePageWrapper';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import styles from './styles.module.scss';
import { fetchChats } from '../../store/actions/fetchChats';

function MessagesPage() {
	const { chats, user } = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchChats(user.id));
	}, []);

	return (
		<>
			{chats.length == 0 ? (
				<div className={styles.wrapper}>
					<h3 className={styles.title}>
						It is still empty here, write a review about the book to start communication
					</h3>
				</div>
			) : (
				<MessagePageWrapper>
					<ChatList />
					<Outlet />
				</MessagePageWrapper>
			)}
		</>
	);
}

export default MessagesPage;
