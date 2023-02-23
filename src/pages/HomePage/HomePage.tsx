import React from 'react';
import {Link} from 'react-router-dom'
import styles from './styles.module.scss'

function HomePage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Create your own library!</h1>
      <Link className={styles.startLink} to='signIn'>Start now</Link>
    </div>
  );
}

export default HomePage;