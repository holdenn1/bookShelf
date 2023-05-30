import React, {useEffect} from 'react';
import styles from "./ChatWindow.module.scss";
import ChatForm from "../../../Forms/ChatForm/ChatForm";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {fetchMessages} from "../../../../store/actions/fetchMessages";
import arrowLeft from './../../../../img/icons/icons8-go-back-24.png'
import arrowRight from './../../../../img/icons/icons8-forward-button-24.png'
import {useParams} from 'react-router-dom'
import classNames from "classnames";
import {setVisibleChatList} from "../../../../store/slices/mainSlice";


function ChatWindow() {
  const {user, messages, chats} = useAppSelector(state => state.account)
  const {isOpenChatList} = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()
  const {chatId} = useParams()
  const chatTitle = chats.filter(chat => chat.chatId == chatId)

  useEffect(() => {
    dispatch(fetchMessages(chatId))
  }, [chatId])

  return (
    <div className={styles.window}>
      <div className={styles.head}>
        {
          isOpenChatList ? (
            <img
              src={arrowRight}
              className={styles.chatListImg}
              onClick={() => dispatch(setVisibleChatList())}
              alt=""/>
          ) : (
            <img
              src={arrowLeft}
              className={styles.chatListImg}
              onClick={() => dispatch(setVisibleChatList())}
              alt=""/>
          )
        }
        {chatTitle.map(title => <h3 key={title.chatId}>{title.bookTitle}</h3>)}</div>
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