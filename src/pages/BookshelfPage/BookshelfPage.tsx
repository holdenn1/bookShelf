import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Library from '../../components/Library/Library';
import { useAuth } from '../../hooks/useAuth';

function BookshelfPage() {
	const { isAuth } = useAuth();
	const navigate = useNavigate();
	console.log(isAuth)
	useEffect(() => {
		!isAuth && navigate('/', { replace: true });
	}, []);

	return (
			<Library />
	);
}

export default BookshelfPage;
