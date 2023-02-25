import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAuth } from '../../hooks/useAuth';
import { removeUser } from './../../store/slices/userSlice';

function BookshelfPage() {
	const dispatch = useAppDispatch();
	const { isAuth, email } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		!isAuth && navigate('/', { replace: true });
	}, []);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				dispatch(removeUser());
				navigate('/');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div>
			<h1>Welcome</h1>
			<button onClick={handleLogout}>Log out from {email}</button>
		</div>
	);
}

export default BookshelfPage;
