import React from 'react';
import styles from "./ChatList.module.scss";

function ChatList() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            Lorem ipsum dolor.
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ChatList;