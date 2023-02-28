import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../firebase';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { removeUser } from '../../../../store/slices/accountSlice';
import { IChildren } from '../../../../types';

export default function LogOutButton({ children }: IChildren) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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
	return <span onClick={handleLogout}>{children}</span>;
}
