import React, {useEffect, useState} from 'react';
import styles from "./ChatList.module.scss";
import {useAppSelector} from "../../../../hooks/reduxHooks";
import {onValue, ref} from "firebase/database";
import {realTimeDb} from "../../../../firebase";
import {NavLink} from "react-router-dom";

interface IFromUserMessage {
  fromUserId?: string
  fromUserEmail?: string
  toUserId?: string
  toUserEmail?: string
  book: string
  chatId: string
}

function ChatList() {
  const [chats, setChats] = useState<IFromUserMessage[]>([])
  const {id, email} = useAppSelector(state => state.account.user)
  const activeLink = ({isActive}: any) => isActive ? styles.activeLink : styles.link;

  useEffect(() => {
    const userChatRef = ref(realTimeDb, `users/${id}/chats/`);
    onValue(userChatRef, (snapshot) => {
      const data = snapshot.val();
      setChats(Object.values(data))
    })
  }, [])

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