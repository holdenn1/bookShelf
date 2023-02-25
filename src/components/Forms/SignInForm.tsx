import React from 'react';
import styles from './styles.module.scss';
import { Form, Formik } from 'formik';
import validateSchema from '../../utils/validate/validateSchema';
import MyTextInput from '../UI/formUI/MyTextInput/MyTextInput';
import ButtonForm from '../UI/formUI/Buttons/ButtonForm';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/userSlice';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { notify } from '../UI/formUI/Toast/Toast';

function SignInForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						id: user.uid,
						email: user.email,
					})
				);
				navigate('/bookShelf');
			})
			.catch(() => notify('Field check'));
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={validateSchema}
			onSubmit={({ email, password }) => {
				handleLogin(email, password);
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
						<ButtonForm>Sign In</ButtonForm>
						<p>
							Or <Link to="/signUp">register</Link>
						</p>
					</Form>
				</>
			)}
		</Formik>
	);
}

export default SignInForm;
