import { useAppSelector } from './reduxHooks';

export function useAuth() {
	const { id, email } = useAppSelector((state) => state.account);
	return {
		isAuth: !!email,
		id,
		email,
	};
}
