import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { IBook, IUser } from '../../types';

export const fetchFavoriteBooks = createAsyncThunk(
	'user/fetchFavoriteBooks',
	async (user: IUser) => {
		try {
			const q = query(collection(db, `books-user-${user.id}`), where('favorite', '==', true));
			const querySnapshot = await getDocs(q);
			const data: IBook[] = querySnapshot.docs.map((doc) => {
				return { ...(doc.data() as Omit<IBook, 'id'>), id: doc.id };
			});
			return data;
		} catch (e) {
			throw e;
		}
	},
);
