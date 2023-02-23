import React from 'react';
import {useRouteError} from 'react-router-dom'
import styles from './styles.module.scss'


function ErrorPage() {
  const error: any = useRouteError();
  return (
    <div className={styles.wrapper}>
      <h3>Oops!</h3>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;