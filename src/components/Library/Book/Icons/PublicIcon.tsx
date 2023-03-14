import React from 'react';
import classNames from "classnames";
import styles from "../Book.module.scss";
import publicImg from "../../../../img/icons/icons8-public-30.png";
import {BookIconProps, IBook} from "../../../../types";

type PublicIconProps = BookIconProps & {
  setPublicBook(book: IBook): Promise<void>
}

function PublicIcon({setPublicBook, book, isAuth, checkCurrentUser}: PublicIconProps) {
  return (
    <img
      onClick={() => setPublicBook(book)}
      className={classNames(styles.publicImg,
        {[styles.isAuth]: !isAuth},
        {[styles.dontCurrentUser]: !checkCurrentUser},
        {[styles.publicActive]: book.seesEveryone})}
      src={publicImg}
      alt=""/>
  );
}

export default PublicIcon;