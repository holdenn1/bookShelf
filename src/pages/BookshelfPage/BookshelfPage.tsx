import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogOutButton from '../../components/UI/formUI/Buttons/LogOutButton';
import { useAuth } from '../../hooks/useAuth';

function BookshelfPage() {
	const { isAuth, email } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		!isAuth && navigate('/', { replace: true });
	}, []);

	return (
		<div>
			<h1>Welcome</h1>
			<LogOutButton>Log out from {email}</LogOutButton>
		</div>
	);
}

export default BookshelfPage;
