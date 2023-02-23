import React from 'react';
import {Form, Formik} from "formik";
import validateSchema from "../../utils/validate/validateSchema";
import {IFormValues} from "../../types";
import styles from "./styles.module.scss";
import MyTextInput from "../UI/formUI/MyTextInput/MyTextInput";
import ButtonForm from "../UI/formUI/Buttons/ButtonForm";

function SignUpForm() {
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
            <ButtonForm>Sign Up</ButtonForm>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default SignUpForm;