import React from 'react';
import { Form, Formik } from 'formik';
import validateSchema from '../../utils/validate/validateSchema';
import styles from './styles.module.scss';
import MyTextInput from '../UI/formUI/MyTextInput/MyTextInput';
import ButtonForm from '../UI/formUI/Buttons/LogInButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/accountSlice';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { notify } from '../UI/formUI/Toast/Toast';

function SignUpForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleRegister = (email: string, password: string) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				console.log(user)
				dispatch(
					setUser({
						id: user.uid,
						email: user.email,
					})
				);
				navigate('/book-shelf/all-books');
			})
			.catch(() => notify('The user already has an account at this address'));
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={validateSchema}
			onSubmit={({ email, password }) => {
				handleRegister(email, password);
			}}
		>
			{(props) => (
				<>
					<Form className={styles.form}>
						<MyTextInput
							label="email"
							name="email"
							type="email"
							placeholder="email"
						/>
						<MyTextInput
							label="password"
							name="password"
							type="password"
							placeholder="password"
						/>
						<ButtonForm>Sign Up</ButtonForm>
						<p>
							Or <Link to="/sign-in">Log In</Link>
						</p>
					</Form>
				</>
			)}
		</Formik>
	);
}

export default SignUpForm;
