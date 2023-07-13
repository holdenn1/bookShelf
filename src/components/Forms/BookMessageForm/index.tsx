import { useState } from 'react';
import styles from './styles.module.scss';
import { Formik, Form, Field, FormikValues } from 'formik';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { notify } from '@/components/UI/Toast';
import { sendingFeedback } from '@/store/actions/sendingFeedback';
import { setVisibleMessageForm } from '@/store/slices/mainSlice';

function BookMessageForm() {
  const [formData, setFormData] = useState({});
  const { visibleMessageForm, currentBook } = useAppSelector((state) => state.main);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: FormikValues, resetForm: any) => {
    if (values.message.trim().length === 0) {
      notify('Message cannot be empty', 'error');
      return;
    }
    const data: FormikValues = { ...formData, ...values };

    dispatch(sendingFeedback({ currentBook, data, user }));
    resetForm();
  };

  return (
    <div
      onClick={() => dispatch(setVisibleMessageForm(!visibleMessageForm))}
      className={classNames(styles.wrapper, { [styles.messageFormActive]: visibleMessageForm })}
    >
      <Formik
        initialValues={{
          message: '',
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {() => (
          <Form onClick={(e) => e.stopPropagation()} className={styles.form}>
            <label className={styles.title} htmlFor='message'>
              Share your impressions
            </label>
            <Field
              className={styles.message}
              name='message'
              as='textarea'
              placeholder='Share your thoughts with the author'
            />
            <button className={styles.submitBtn} type='submit'>
              Submit message
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookMessageForm;
