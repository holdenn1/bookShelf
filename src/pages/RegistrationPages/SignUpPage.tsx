import styles from "./styles.module.scss";
import SignUpForm from "../../components/Forms/mainForms/SignUpForm";

function SignUpPage() {
  return (
    <main className={styles.mainBlockRegistrationForm}>
      <SignUpForm />
    </main>
  );
}

export default SignUpPage;
