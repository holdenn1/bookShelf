import React from 'react';
import styles from './BookMessageForm.module.scss'
import {Formik, Form, Field} from 'formik'
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {setVisibleMessageForm} from "../../../store/slices/mainSlice";

function BookMessageForm() {
  const {visibleMessageForm} = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()
  return (
    <div
      onClick={() => dispatch(setVisibleMessageForm(!visibleMessageForm))}
      className={classNames(styles.wrapper,
        {[styles.messageFormActive]: visibleMessageForm})}>
      <Formik
        initialValues={{
          title: '',
          message: ''
        }}
        onSubmit={() => console.log(1)}
      >
        {() => (
          <Form
            onClick={e => e.stopPropagation()}
            className={styles.form}>
            <label
              className={styles.title}
              htmlFor="title">
              Title Message
            </label>
            <Field
              className={styles.titleInput}
              name='title'
              placeholder='Enter the subject of the message'/>
            <label
              className={styles.title}
              htmlFor="message">
              Message
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