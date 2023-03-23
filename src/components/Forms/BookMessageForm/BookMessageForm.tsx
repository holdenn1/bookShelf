import React, {useState} from 'react';
import styles from './BookMessageForm.module.scss'
import {Formik, Form, Field} from 'formik'
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {setVisibleMessageForm} from "../../../store/slices/mainSlice";
import {realTimeDb} from "../../../firebase";
import {ref, set, push} from "firebase/database";

interface IMessage {
  message: string
}

function BookMessageForm() {
  const [formData, setFormData] = useState({})
  const {visibleMessageForm, currentBook} = useAppSelector(state => state.main)
  const {id, email} = useAppSelector(state => state.account.user)
  const dispatch = useAppDispatch()

  const handleSubmit = async (values: IMessage, resetForm: any) => {
    const data: IMessage = {...formData, ...values}
    const message = {}

    const newChatRef = push(ref(realTimeDb, "chats"));
    const chatPath = `chats/${newChatRef.key}/messages/`;
    const sendMessage = await push(ref(realTimeDb, chatPath), {message: data.message})

    const addFirstUser = await push(ref(realTimeDb, `users/${id}/chats/`), {
      toUserId: currentBook.userId,
      toUserEmail: currentBook.userEmail,
      bookId: currentBook.booksEveryoneCollectionID,
      bookTitle: currentBook.title,
      chatId: newChatRef.key
    })

    const addSecondUser = await push(ref(realTimeDb, `users/${currentBook.userId}/chats/`), {
      fromUserId: id,
      fromUserEmail: email,
      bookId: currentBook.booksEveryoneCollectionID,
      bookTitle: currentBook.title,
      chatId: newChatRef.key
    })

    dispatch(setVisibleMessageForm(false))
    resetForm()
  }

  return (
    <div
      onClick={() => dispatch(setVisibleMessageForm(!visibleMessageForm))}
      className={classNames(styles.wrapper,
        {[styles.messageFormActive]: visibleMessageForm})}>
      <Formik
        initialValues={{
          message: ''
        }}
        onSubmit={(values, {resetForm}) => {
          handleSubmit(values, resetForm)
        }}
      >
        {() => (
          <Form
            onClick={e => e.stopPropagation()}
            className={styles.form}>
            <label
              className={styles.title}
              htmlFor="message">
              Share your impressions
            </label>
            <Field
              className={styles.message}
              name='message'
              as="textarea"
              placeholder='Share your thoughts with the author'/>
            <button className={styles.submitBtn} type='submit'>Submit message</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookMessageForm;