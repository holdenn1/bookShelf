import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Field, Formik , Form} from "formik";
import { updateBook } from "@/store/actions/updateBook";
import { IBook } from "@/types";

export type InitialValuesUpdateBook = {
  title: string;
  description: string;
};

type EditBookFormProps = {
  setModalWisible: Dispatch<SetStateAction<boolean>>;
  book: IBook
}

function EditBookForm({book,setModalWisible}:EditBookFormProps) {
  const { user, chats } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: InitialValuesUpdateBook, resetForm: any) => {

    const updatedBook = chats.find((chat) => chat.bookId === book.id)!;
    dispatch(updateBook({ book, user, values, updatedBook }));
    setModalWisible(false);
    resetForm();
  };

  const initialValues = {
    title: "",
    description: "",
  };

  return (
    <div
      className={classNames(styles.modalWrapper)}
      onClick={() => setModalWisible(false)}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
          {() => (
            <Form className={styles.form}>
              <Field
                className={styles.title}
                name="title"
                type="text"
                placeholder="Edit title"
              />
              <Field
                className={styles.description}
                name="description"
                as="textarea"
                placeholder="Edit description"
              />
              <button type="submit" className={styles.submit}>
                Edit book
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditBookForm;
