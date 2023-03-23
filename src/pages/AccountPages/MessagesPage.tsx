import React from 'react';
import styles from "./styles.module.scss";
import ChatList from "../../components/Library/Chat/ChatList/ChatList";
import {Outlet} from 'react-router-dom'

function MessagesPage() {

  return (
    <div className={styles.messagePageWrapper}>
      <ChatList/>
      <Outlet/>
    </div>
  );
}

export default MessagesPage;