import React from 'react';
import styles from './Main.module.scss'

type Main = {
  children: React.ReactNode
}

function Main({children}: Main) {
  return (
    <main className={styles.main}>{children}</main>
  );
}

export default Main;