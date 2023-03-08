import React from 'react';
import styles from './styles.module.scss';
import LinkToBookShelf from '../../components/UI/formUI/Links/LinkToBookShelf';
import {useAuth} from '../../hooks/useAuth';
import {Link} from 'react-router-dom'

function HomePage() {
  const {isAuth} = useAuth();

  return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{isAuth ? 'Back to the library?' : 'Create your own library!'}</h1>
        <div className={styles.linkContainer}>
          <LinkToBookShelf>
				<span className={styles.start}>
					{isAuth ? 'Continue' : 'Start now'}
				</span>
          </LinkToBookShelf>
          <span className={styles.choice}>or</span>
          <Link className={styles.linkToLibrary} to='library'>Look at the library</Link>
        </div>
      </div>
  );
}

export default HomePage;
