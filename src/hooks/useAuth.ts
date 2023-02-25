import { useAppSelector } from './reduxHooks';

export function useAuth() {
	const { id, email } = useAppSelector((state) => state.user);
	return {
		isAuth: !!email,
		id,
		email,
	};
}
