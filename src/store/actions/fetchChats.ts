import { realTimeDb } from '@/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { onValue, ref } from 'firebase/database';
import { setChats } from '../slices/accountSlice';

export const fetchChats = createAsyncThunk<void, string>(
	'user/fetchChats',
	async (id, { dispatch }) => {
		try {
			const userChatRef = ref(realTimeDb, `users/${id}/chats/`);
			onValue(userChatRef, (snapshot) => {
				const data = snapshot.val();
				if (data !== null) {
					dispatch(setChats(Object.values(data)));
				} else {
					dispatch(setChats([]));
				}
			});
		} catch (e) {
			throw e;
		}
	},
);
