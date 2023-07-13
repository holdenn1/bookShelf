import { Form, Formik } from 'formik';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { setUser } from '@/store/slices/accountSlice';
import { notify } from '@/components/UI/Toast';
import registrationValidateSchema from '@/utils/validate/registrationValidateSchema';
import MyTextInput from '@/components/UI/formUI/MyTextInput';
import ButtonForm from '@/components/UI/formUI/Buttons/LogInButton';
import { Link } from 'react-router-dom';

function SignUpForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleRegister = (email: string, password: string) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				if (!!user.email) {
					dispatch(
						setUser({
							id: user.uid,
							email: user.email,
						}),
					);
				}
				navigate('/book-shelf/all-books');
			})
			.catch(() => notify('The user already has an account at this address', 'error'));
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={registrationValidateSchema}
			onSubmit={({ email, password }) => {
				handleRegister(email, password);
			}}
		>
			{() => (
				<>
					<Form className={styles.form}>
						<MyTextInput label='email' name='email' type='email' placeholder='email' />
						<MyTextInput label='password' name='password' type='password' placeholder='password' />
						<ButtonForm>Sign Up</ButtonForm>
						<p>
							Or <Link to='/sign-in'>Log In</Link>
						</p>
					</Form>
				</>
			)}
		</Formik>
	);
}

export default SignUpForm;
