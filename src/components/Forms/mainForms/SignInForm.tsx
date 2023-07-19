import { useAppDispatch } from '@/hooks/reduxHooks';
import styles from './styles.module.scss';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { setUser } from '@/store/slices/accountSlice';
import { notify } from '@/components/UI/Toast';
import registrationValidateSchema from '@/utils/validate/registrationValidateSchema';
import MyTextInput from '@/components/UI/formUI/MyTextInput';
import ButtonForm from '@/components/UI/formUI/Buttons/LogInButton';
import { Link } from 'react-router-dom';

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
          <p className={styles.formNavigateText}>
            Or <Link to='/sign-up'>register</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
