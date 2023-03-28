import React, {useEffect} from 'react';
import styles from "./ChatWindow.module.scss";
import ChatForm from "../../../Forms/ChatForm/ChatForm";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {useParams} from 'react-router-dom'
import classNames from "classnames";
import {fetchMessages} from "../../../../store/actions/fetchMessages";


function ChatWindow() {
  const {user, messages, chats} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()
  const {chatId} = useParams()
  const chatTitle = chats.filter(chat => chat.chatId == chatId)

  useEffect(() => {
    dispatch(fetchMessages(chatId))
  }, [chatId])

  return (
    <div className={styles.window}>
      <div className={styles.head}>{chatTitle.map(title => <h3 key={title.chatId}>{title.bookTitle}</h3>)}</div>
      <div className={styles.chatContainer}>
        <ul className={styles.chat}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={classNames(styles.receiveUser,
                {[styles.sendingUser]: message.senderId === user.id})}>
              <span>{message.message}</span>
            </li>
          ))}
        </ul>
      </div>
      <ChatForm/>
    </div>
  );
}

export default ChatWindow;