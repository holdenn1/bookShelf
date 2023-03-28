import React, {useState} from 'react';
import styles from "./ChatForm.module.scss";
import {Field, Form, Formik, FormikValues} from "formik";
import {push, ref, serverTimestamp, set} from "firebase/database";
import {useAppSelector} from "../../../hooks/reduxHooks";
import {realTimeDb} from "../../../firebase";
import {useParams} from "react-router-dom";

function ChatForm() {
  const [formData, setFormData] = useState({})
  const {id} = useAppSelector(state => state.account.user)
  const {chatId} = useParams()

  const handleSubmit = async (values: FormikValues, resetForm: any) => {
    const data: FormikValues = {...formData, ...values}
    const chatRef = push(ref(realTimeDb, "chats"));
    const messageRef = push(ref(realTimeDb, `chats/${chatId}/messages/`));

    const sendMessage = await set(ref(realTimeDb, `chats/${chatId}/messages/${messageRef.key}`), {
      senderId: id,
      messageId: messageRef.key,
      message: data.message,
      timestamp: serverTimestamp()
    })

    resetForm()
  }
  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          message: ''
        }}
        onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}
      >
        {() => (
          <Form className={styles.form}>
            <Field className={styles.message} name='message' as="textarea"/>
            <button className={styles.submit} type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatForm;