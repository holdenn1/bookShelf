import { useAppSelector } from './reduxHooks';

export function useAuth() {
	const { id, email } = useAppSelector((state) => state.account.user);
	return {
		isAuth: !!email,
		id,
		email,
	};
}
