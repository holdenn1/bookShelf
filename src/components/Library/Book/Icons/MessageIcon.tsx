import React from 'react';
import massage from "../../../../img/icons/icons8-edit-message-24.png";
import styles from './../Book.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {setCurrentBook, setVisibleMessageForm} from "../../../../store/slices/mainSlice";
import {IBook} from "../../../../types";

interface IMessageIconProps {
  book: IBook
}

function MessageIcon({book}: IMessageIconProps) {
  const {visibleMessageForm} = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()

  return (
    <img onClick={() => {
      dispatch(setVisibleMessageForm(!visibleMessageForm))
      dispatch(setCurrentBook(book))
    }}
         className={styles.messageForUser}
         src={massage} alt=""
    />
  );
}

export default MessageIcon;