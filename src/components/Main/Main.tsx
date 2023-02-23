import React from 'react';
import styles from './Main.module.scss'
import {IChildren} from "../../types";

function Main({children}: IChildren) {
  return (
    <main className={styles.main}>{children}</main>
  );
}

export default Main;