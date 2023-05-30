import { createAsyncThunk } from '@reduxjs/toolkit';
import { onValue, ref } from 'firebase/database';
import { realTimeDb } from '../../firebase';
import { setMessages } from '../slices/accountSlice';

export const fetchMessages = createAsyncThunk<void, string | undefined>(
	'user/fetchMessages',
	async (chatId, { dispatch }) => {
		try {
			const userChatRef = ref(realTimeDb, `chats/${chatId}/messages`);
			onValue(userChatRef, (snapshot) => {
				const data = snapshot.val();
				if (data !== null) {
					dispatch(setMessages(Object.values(data)));
				} else {
					dispatch(setMessages([]));
				}
			});
		} catch (e) {
			throw e;
		}
	},
);
