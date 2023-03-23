import React, {useEffect, useState} from 'react';
import styles from "./ChatWindow.module.scss";
import ChatForm from "../../../Forms/ChatForm/ChatForm";
import {onValue, ref} from "firebase/database";
import {realTimeDb} from "../../../../firebase";
import {useAppSelector} from "../../../../hooks/reduxHooks";
import {useParams} from 'react-router-dom'
import classNames from "classnames";
import {IMessage} from "../../../../types";



function ChatWindow() {
  const {id} = useAppSelector(state => state.account.user)
  const {chatId} = useParams()
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    const userChatRef = ref(realTimeDb, `chats/${chatId}/messages`);
    onValue(userChatRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(Object.values(data))
    })
  }, [chatId])


  return (
    <div className={styles.window}>
      <div className={styles.head}><h3>Lorem ipsum dolor sit amet.</h3></div>
      <div className={styles.chatContainer}>
        <ul className={styles.chat}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={classNames(styles.receiveUser,
                {[styles.sendingUser]: message.senderId === id})}>
              {message.message}
            </li>
          ))}
        </ul>
      </div>
      <ChatForm/>
    </div>

  );
}

export default ChatWindow;