import React from 'react';
import styles from "./ChatForm.module.scss";
import {Field, Form, Formik} from "formik";

function ChatForm() {
  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          message: ''
        }}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <Field name='message' as="textarea"/>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatForm;