import React from 'react';
import styles from './Header.module.scss';
import {Link, useLocation} from 'react-router-dom';
import LinkToBookShelf from '../UI/formUI/Links/LinkToBookShelf';
import logIn from './../../img/icons/icons8-male-user-50.png';
import logOut from './../../img/icons/icons8-log-out-50.png';
import {useAuth} from '../../hooks/useAuth';
import LogOutButton from '../UI/formUI/Buttons/LogOutButton';
import menuBtn from '../../img/icons/icons8-menu-50.png'
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setVisibleMenu} from "../../store/slices/mainSlice";
import classNames from "classnames";

function Header() {
  const {isAuth} = useAuth();
  const dispatch = useAppDispatch()
  const {visibleMenu} = useAppSelector(state => state.main)
  const location = useLocation();
  const showMenu = location.pathname.startsWith('/book-shelf/');

  return (
    <header className={styles.header}>
      <Link to="/">BookShelf</Link>
      {isAuth ? (
        <LogOutButton>
          <img className={styles.userLink} src={logOut} alt="log-out"/>
        </LogOutButton>
      ) : (
        <LinkToBookShelf>
          <img className={styles.userLink} src={logIn} alt="log-in"/>
        </LinkToBookShelf>
      )}
      <img
        onClick={() => dispatch(setVisibleMenu(!visibleMenu))}
        className={classNames(styles.menuBtn,{[styles.showMenu]: showMenu})}
        src={menuBtn} alt=""/>
    </header>
  );
}

export default Header;
