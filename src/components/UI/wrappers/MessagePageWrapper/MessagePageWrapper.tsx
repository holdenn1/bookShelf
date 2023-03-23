import React from 'react';
import styles from './MessagePageWrapper.module.scss'
import {IChildren} from "../../../../types";

function MessagePageWrapper({children}:IChildren) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

export default MessagePageWrapper;