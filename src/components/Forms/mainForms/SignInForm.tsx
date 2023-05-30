import React from 'react';
import styles from './styles.module.scss';
import { Form, Formik } from 'formik';
import registrationValidateSchema from '../../../utils/validate/registrationValidateSchema';
import MyTextInput from '../../UI/formUI/MyTextInput/MyTextInput';
import ButtonForm from '../../UI/formUI/Buttons/LogInButton';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../../store/slices/accountSlice';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebase';
import { notify } from '../../UI/Toast/Toast';

function SignInForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
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
			.catch(() => notify('Field check', 'error'));
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={registrationValidateSchema}
			onSubmit={({ email, password }) => {
				handleLogin(email, password);
			}}
		>
			{() => (
				<Form className={styles.form}>
					<MyTextInput label='email' name='email' type='email' placeholder='email' />
					<MyTextInput label='password' name='password' type='password' placeholder='password' />
					<ButtonForm>Sign In</ButtonForm>
					<p>
						Or <Link to='/sign-up'>register</Link>
					</p>
				</Form>
			)}
		</Formik>
	);
}

export default SignInForm;
