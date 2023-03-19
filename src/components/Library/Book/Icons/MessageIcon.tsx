import React from 'react';
import massage from "../../../../img/icons/icons8-edit-message-24.png";
import styles from './../Book.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {setVisibleMessageForm} from "../../../../store/slices/mainSlice";

function MessageIcon() {
  const {visibleMessageForm} = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()
  return (
    <img onClick={() => dispatch(setVisibleMessageForm(!visibleMessageForm))}
         className={styles.messageForUser}
         src={massage} alt=""/>
  );
}

export default MessageIcon;