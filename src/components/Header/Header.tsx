import React from 'react';
import styles from './Header.module.scss'
import {Link} from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}><Link to='/'>BookShelf</Link></header>
  );
}

export default Header;