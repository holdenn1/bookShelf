import classNames from "classnames";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import Loader from "@/components/UI/Loader";
import AddingBookForm from "@/components/Forms/AddingBookForm";
import MainButton from "@/components/UI/addingBookForm/Buttons/MainButton";
import {
  setVisibleAddingBookForm,
  setVisibleMenu,
} from "@/store/slices/mainSlice";

export default function NewBookPage() {
  const { visibleAddingBookForm } = useAppSelector((state) => state.main);
  const { loading, error } = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setVisibleAddingBookForm(true));
  };

  return (
    <>
      <div
        onClick={() => dispatch(setVisibleMenu(false))}
        className={classNames(styles.wrapper, {
          [styles.visibleNewBookMessage]: visibleAddingBookForm,
        })}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <h3 className={styles.title}>
              Would you like to add more books to the library?
            </h3>
            <MainButton title="Add book" type="button" onClick={handleClick} />
            <p className={styles.error}>{error}</p>
          </>
        )}
      </div>
      <AddingBookForm />
    </>
  );
}
