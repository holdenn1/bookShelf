import Book from '@/components/Library/Book';
import LibraryTitle from '@/components/Library/LibraryTitle';
import BookshelfWrapper from '@/components/UI/wrappers/BookshelfWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchFavoriteBooks } from '@/store/actions/fetchFavoriteBooks';
import  { useEffect } from 'react';

function FavoriteBooksPage() {
	const { favoriteBooks, user } = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchFavoriteBooks(user));
	}, []);

	return (
		<>
			{favoriteBooks.length == 0 ? (
				<LibraryTitle />
			) : (
				<BookshelfWrapper>
					{favoriteBooks.map((book) => (
						<Book key={book.id} {...book} />
					))}
				</BookshelfWrapper>
			)}
		</>
	);
}

export default FavoriteBooksPage;
