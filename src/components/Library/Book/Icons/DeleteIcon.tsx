import React from 'react';
import {removeBook} from "../../../../store/actions/removeBook";
import classNames from "classnames";
import styles from "../Book.module.scss";
import deleteIcon from "../../../../img/icons/icons8-delete-24.png";
import {useAppDispatch} from "../../../../hooks/reduxHooks";
import {BookIconProps, IUser} from "../../../../types";

type DeleteIconProps = BookIconProps & {
  user: IUser
}

function DeleteIcon({book, isAuth, checkCurrentUser, user}: DeleteIconProps) {
  const dispatch = useAppDispatch()
  return (
    <img
      onClick={() => dispatch(removeBook({book, user}))}
      className={classNames(styles.delete,
        {[styles.isAuth]: !isAuth},
        {[styles.dontCurrentUser]: !checkCurrentUser})}
      src={deleteIcon} alt=""/>
  );
}

export default DeleteIcon;