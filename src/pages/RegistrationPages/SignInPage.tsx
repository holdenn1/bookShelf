import styles from './styles.module.scss'
import SignInForm from "@/components/Forms/mainForms/SignInForm";

function SignInPage() {
	return (
			<main className={styles.mainBlockRegistrationForm}>
			<SignInForm />
			</main>
	);
}

export default SignInPage;
