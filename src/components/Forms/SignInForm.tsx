import React from 'react';
import styles from './styles.module.scss'
import {Form, Formik} from 'formik'
import validateSchema from "../../utils/validate/validateSchema";
import MyTextInput from "../UI/formUI/MyTextInput/MyTextInput";
import {IFormValues} from "../../types";
import ButtonForm from "../UI/formUI/Buttons/ButtonForm";

function SignInForm() {

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validateSchema}
      onSubmit={((values: IFormValues) => {
        console.log(values)
      })}
    >
      {(props) => (
        <>
          <Form className={styles.form}>
            <MyTextInput label='email' name='email' type='email' placeholder='email'/>
            <MyTextInput label='password' name='password' type='password' placeholder='password'/>
            <ButtonForm>Sign In</ButtonForm>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default SignInForm;