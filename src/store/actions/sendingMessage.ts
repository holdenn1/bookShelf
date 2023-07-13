import { realTimeDb } from '@/firebase';
import { IUser } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { push, ref, serverTimestamp, set } from 'firebase/database';
import { FormikValues } from 'formik';

interface ISendingMessageProps {
	user: IUser;
	chatId: string | undefined;
	data: FormikValues;
}

export const sendingMessage = createAsyncThunk<void, ISendingMessageProps>(
	'user/sendingMessage',
	async ({ user, chatId, data }) => {
		try {
			push(ref(realTimeDb, 'chats'));
			const messageRef = push(ref(realTimeDb, `chats/${chatId}/messages/`));

			await set(ref(realTimeDb, `chats/${chatId}/messages/${messageRef.key}`), {
				senderId: user.id,
				messageId: messageRef.key,
				message: data.message,
				timestamp: serverTimestamp(),
			});
		} catch (e) {
			throw e;
		}
	},
);
