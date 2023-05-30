import { createAsyncThunk } from '@reduxjs/toolkit';
import { push, ref, serverTimestamp, set } from 'firebase/database';
import { db, realTimeDb } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { fetchSeesBooksEveryone } from './fetchSeesBooksEveryone';
import { setVisibleMessageForm } from '../slices/mainSlice';
import { IBook, IUser } from '../../types';
import { FormikValues } from 'formik';

interface ISendingFeedbackProps {
	user: IUser;
	currentBook: IBook;
	data: FormikValues;
}
export const sendingFeedback = createAsyncThunk<void, ISendingFeedbackProps>(
	'user/sendingFeedback',
	async ({ user, currentBook, data }, { dispatch }) => {
		try {
			const chatRef = push(ref(realTimeDb, 'chats'));
			const messageRef = push(ref(realTimeDb, `chats/${chatRef.key}/messages/`));

			const firstUserRef = await push(ref(realTimeDb, `users/${user.id}/chats/`));
			const secondUserRef = await push(ref(realTimeDb, `users/${currentBook.userId}/chats/`));

			const docUserRef = doc(db, `books-user-${currentBook.userId}`, `${currentBook.id}`);
			const docPublicRef = doc(
				db,
				`books-sees-everyone`,
				`${currentBook.booksEveryoneCollectionID}`,
			);

			await set(ref(realTimeDb, `chats/${chatRef.key}/messages/${messageRef.key}`), {
				senderId: user.id,
				messageId: messageRef.key,
				message: data.message,
				timestamp: serverTimestamp(),
			});

			await set(ref(realTimeDb, `users/${user.id}/chats/${firstUserRef.key}`), {
				toUserId: currentBook.userId,
				fromUserId: user.id,
				toUserEmail: currentBook.userEmail,
				booksEveryoneCollectionID: currentBook.booksEveryoneCollectionID,
				bookId: currentBook.id,
				bookTitle: currentBook.title,
				chatId: chatRef.key,
				firstUserChatId: firstUserRef.key,
				secondUserChatId: secondUserRef.key,
			});

			await set(ref(realTimeDb, `users/${currentBook.userId}/chats/${secondUserRef.key}`), {
				fromUserId: user.id,
				toUserId: currentBook.userId,
				fromUserEmail: user.email,
				booksEveryoneCollectionID: currentBook.booksEveryoneCollectionID,
				bookId: currentBook.id,
				bookTitle: currentBook.title,
				chatId: chatRef.key,
				firstUserChatId: firstUserRef.key,
				secondUserChatId: secondUserRef.key,
			});

			await updateDoc(docPublicRef, { usersWhoSendMessage: arrayUnion(user.id) });
			await updateDoc(docUserRef, { usersWhoSendMessage: arrayUnion(user.id) });

			dispatch(fetchSeesBooksEveryone());
			dispatch(setVisibleMessageForm(false));
		} catch (e) {
			throw e;
		}
	},
);
