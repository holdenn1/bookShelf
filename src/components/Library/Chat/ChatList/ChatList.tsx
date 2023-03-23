import React, {useEffect, useState} from 'react';
import styles from "./ChatList.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {onValue, ref} from "firebase/database";
import {realTimeDb} from "../../../../firebase";
import {NavLink} from "react-router-dom";
import {setChats} from "../../../../store/slices/mainSlice";



function ChatList() {
  const {id, email} = useAppSelector(state => state.account.user)
  const {chats} = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()
  const activeLink = ({isActive}: any) => isActive ? styles.activeLink : styles.link;

  useEffect(() => {
    const userChatRef = ref(realTimeDb, `users/${id}/chats/`);
    onValue(userChatRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setChats(Object.values(data)))
    })
  }, [])
  console.log(chats)

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {chats.map((chat, index) => (
          <NavLink key={index} className={activeLink}  to={`/book-shelf/messages/${chat.chatId}`}>
            <li className={styles.item}>
              {chat.fromUserEmail ? chat.fromUserEmail : chat.toUserEmail}
            </li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default ChatList;