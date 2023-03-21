import React from 'react';
import styles from "./ChatWindow.module.scss";
import ChatForm from "../../../Forms/ChatForm/ChatForm";

function ChatWindow() {
  return (
    <div className={styles.window}>
      <ChatForm/>
    </div>
  );
}

export default ChatWindow;