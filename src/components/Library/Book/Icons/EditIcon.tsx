import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import editIcon from "@/img/icons/icons8-edit-24.png";
import styles from "./../styles.module.scss";
import { BookIconProps } from "@/types";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentBook } from "@/store/slices/mainSlice";

type EditIconProps = BookIconProps & {
  modalWisible: boolean;
  setModalWisible: Dispatch<SetStateAction<boolean>>;
};

function EditIcon({
  book,
  isAuth,
  checkCurrentUser,
  setModalWisible,
  modalWisible,
}: EditIconProps) {
  const dispatch = useAppDispatch()
  return (
    <img
      onClick={() => {
        dispatch(setCurrentBook(book))
        setModalWisible(!modalWisible)
      } }
      className={classNames(
        styles.editIcon,
        { [styles.isAuth]: !isAuth },
        { [styles.dontCurrentUser]: !checkCurrentUser }
      )}
      src={editIcon}
      alt=""
    />
  );
}

export default EditIcon;
