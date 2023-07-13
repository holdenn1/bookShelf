import { db } from '@/firebase';
import { IBook } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchSeesBooksEveryone = createAsyncThunk('user/fetchSeesBooksEveryone', async () => {
	try {
		const q = query(collection(db, `books-sees-everyone`), where('seesEveryone', '==', true));
		const querySnapshot = await getDocs(q);
		const data: IBook[] = querySnapshot.docs.map((doc) => {
			return { ...(doc.data() as IBook) };
		});
		return data;
	} catch (e) {
		throw e;
	}
});
