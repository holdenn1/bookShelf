import { useState, Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
import { Field, Form, Formik, FormikValues } from "formik";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { notify } from "@/components/UI/Toast";
import { sendingMessage } from "@/store/actions/sendingMessage";

type ChatFormProps = {
  setShowChatMenu: Dispatch<SetStateAction<boolean>>;
  prevMenu: NodeListOf<Element>;
};

function ChatForm({ setShowChatMenu, prevMenu }: ChatFormProps) {
  const [formData, setFormData] = useState({});
  const { user } = useAppSelector((state) => state.account);
  const { chatId } = useParams();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: FormikValues, resetForm: any) => {
    if (values.message.trim().length === 0) {
      notify("Message cannot be empty", "error");
      return;
    }
    const data: FormikValues = { ...formData, ...values };
    dispatch(sendingMessage({ chatId, user, data }));
    
    setShowChatMenu(false);
    prevMenu.forEach((element) => {
      element.removeAttribute("data-foo");
    });

    resetForm();
  };
  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          message: "",
        }}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {() => (
          <Form className={styles.form}>
            <Field className={styles.message} name="message" as="textarea" />
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatForm;
