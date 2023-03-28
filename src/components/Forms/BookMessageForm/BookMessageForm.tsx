import React, {useState} from 'react';
import styles from './BookMessageForm.module.scss'
import {Formik, Form, Field, FormikValues} from 'formik'
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {setVisibleMessageForm} from "../../../store/slices/mainSlice";
import {db, realTimeDb} from "../../../firebase";
import {ref, set, serverTimestamp, push} from "firebase/database";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {fetchSeesBooksEveryone} from "../../../store/actions/fetchSeesBooksEveryone";


function BookMessageForm() {
  const [formData, setFormData] = useState({})
  const {visibleMessageForm, currentBook} = useAppSelector(state => state.main)
  const {id, email} = useAppSelector(state => state.account.user)
  const dispatch = useAppDispatch()

  const handleSubmit = async (values: FormikValues, resetForm: any) => {
    const data: FormikValues = {...formData, ...values}

    const chatRef = push(ref(realTimeDb, "chats"));
    const messageRef = push(ref(realTimeDb, `chats/${chatRef.key}/messages/`));

    const firstUserRef = await push(ref(realTimeDb, `users/${id}/chats/`))
    const secondUserRef = await push(ref(realTimeDb, `users/${currentBook.userId}/chats/`))

    const docUserRef = doc(db, `books-user-${currentBook.userId}`, `${currentBook.id}`);
    const docPublicRef = doc(db, `books-sees-everyone`, `${currentBook.booksEveryoneCollectionID}`)

    const sendMessage = await set(ref(realTimeDb, `chats/${chatRef.key}/messages/${messageRef.key}`), {
      senderId: id,
      messageId: messageRef.key,
      message: data.message,
      timestamp: serverTimestamp()
    })

    const addFirstUser = await set(ref(realTimeDb, `users/${id}/chats/${firstUserRef.key}`), {
      toUserId: currentBook.userId,
      fromUserId: id,
      toUserEmail: currentBook.userEmail,
      booksEveryoneCollectionID: currentBook.booksEveryoneCollectionID,
      bookId: currentBook.id,
      bookTitle: currentBook.title,
      chatId: chatRef.key,
      firstUserChatId: firstUserRef.key,
      secondUserChatId: secondUserRef.key
    })

    const addSecondUser = await set(ref(realTimeDb, `users/${currentBook.userId}/chats/${secondUserRef.key}`), {
      fromUserId: id,
      toUserId: currentBook.userId,
      fromUserEmail: email,
      booksEveryoneCollectionID: currentBook.booksEveryoneCollectionID,
      bookId: currentBook.id,
      bookTitle: currentBook.title,
      chatId: chatRef.key,
      firstUserChatId: firstUserRef.key,
      secondUserChatId: secondUserRef.key
    })

    await updateDoc(docPublicRef, {usersWhoSendMessage: arrayUnion(id)});
    await updateDoc(docUserRef, {usersWhoSendMessage: arrayUnion(id)});

    dispatch(fetchSeesBooksEveryone())
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