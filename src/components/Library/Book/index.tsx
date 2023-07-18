import { useState } from "react";
import { IBook } from "@/types";
import styles from "./styles.module.scss";
import FavoriteIcon from "./icons/FavoriteIcon";
import PublicIcon from "./icons/PublicIcon";
import LikeIcon from "./icons/LikeIcon";
import UnlikeIcon from "./icons/UnlikeIcon";
import RemoveIcon from "./icons/RemoveIcon";
import MessageIcon from "./icons/MessageIcon";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useAuth } from "@/hooks/useAuth";
import { setFavoriteBook } from "@/store/actions/setFavoriteBook";
import { setPublic } from "@/store/actions/setPublic";
import { setLikeBook } from "@/store/actions/setLikeBook";
import { setUnlikeBook } from "@/store/actions/setUnlikeBook";
import EditIcon from "./icons/EditIcon";
import { Field, Form, Formik } from "formik";
import MyTextInput from "@/components/UI/formUI/MyTextInput";
import SubmitButton from "@/components/UI/addingBookForm/Buttons/SubmitButton";
import { updateBook } from "@/store/actions/updateBook";

export type InitialValuesUpdateBook = {
  title: string;
  description: string;
};
function Book(book: IBook) {
  const { user, library } = useAppSelector((state) => state.account);
  const [modalWisible, setModalWisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isAuth, id } = useAuth();
  const initialValues = {
    title: "",
    description: "",
  };

  const checkCurrentUser = id === book.userId;

  const addFavoriteBook = async (book: IBook) => {
    dispatch(setFavoriteBook({ book, library, user }));
  };

  const setPublicBook = async (book: IBook) => {
    dispatch(setPublic({ book, library, user }));
  };

  const setLike = async (book: IBook) => {
    dispatch(setLikeBook({ isAuth, book, user }));
  };

  const setUnlike = async (book: IBook) => {
    dispatch(setUnlikeBook({ isAuth, book, user }));
  };

  const handleSubmit = (values: InitialValuesUpdateBook, resetForm: any) => {
    console.log(values);
    dispatch(updateBook({ book, user, values }));
    setModalWisible(false);
    resetForm();
  };

  return (
    <>
      <div key={book.id} className={styles.card}>
        <div className={styles.front}>
          <span className={styles.count}>{book.rating}⭐</span>
          <img src={book.cover} alt="" />
        </div>
        <div className={styles.back}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.description}>{book.description}</p>
          <FavoriteIcon
            addFavoriteBook={addFavoriteBook}
            book={book}
            checkCurrentUser={checkCurrentUser}
            isAuth={isAuth}
          />
          <PublicIcon
            setPublicBook={setPublicBook}
            book={book}
            checkCurrentUser={checkCurrentUser}
            isAuth={isAuth}
          />
          <EditIcon
            book={book}
            checkCurrentUser={checkCurrentUser}
            isAuth={isAuth}
            setModalWisible={setModalWisible}
            modalWisible={modalWisible}
          />
          <RemoveIcon
            book={book}
            user={user}
            checkCurrentUser={checkCurrentUser}
            isAuth={isAuth}
          />
          <div
            className={classNames(styles.bookPanel, {
              [styles.dontCurrentUser]: checkCurrentUser,
            })}
          >
            <LikeIcon
              setLike={setLike}
              book={book}
              checkCurrentUser={checkCurrentUser}
            />
            <MessageIcon book={book} />
            <UnlikeIcon
              setUnlike={setUnlike}
              book={book}
              checkCurrentUser={checkCurrentUser}
            />
          </div>
        </div>
      </div>
      {modalWisible && (
        <div
          className={styles.modalWrapper}
          onClick={() => setModalWisible(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
              }
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
      )}
    </>
  );
}

export default Book;
