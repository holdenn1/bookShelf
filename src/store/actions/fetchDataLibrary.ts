import { db } from '@/firebase';
import { IBook } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';

export const fetchDataLibrary = createAsyncThunk<IBook[], string>(
	'user/fetchDataLibrary',
	async (id) => {
		try {
			const querySnapshot = await getDocs(collection(db, `books-user-${id}`));
			const data: IBook[] = querySnapshot.docs.map((doc) => {
				return { ...(doc.data() as Omit<IBook, 'id'>), id: doc.id };
			});
			return data;
		} catch (e) {
			throw e;
		}
	},
);
