import React from 'react';
import classNames from "classnames";
import styles from "../Book.module.scss";
import favoriteIcon from "../../../../img/icons/star-svgrepo-com.svg";
import {BookIconProps, IBook} from "../../../../types";

type FavoriteIconProps = BookIconProps & {
  addFavoriteBook(book: IBook): Promise<void>
}

function FavoriteIcon({addFavoriteBook, book, isAuth, checkCurrentUser}: FavoriteIconProps) {
  return (
    <img
      onClick={() => addFavoriteBook(book)}
      className={classNames(styles.favoriteStar,
        {[styles.isAuth]: !isAuth},
        {[styles.dontCurrentUser]: !checkCurrentUser},
        {[styles.favoriteActive]: book.favorite}
      )}
      src={favoriteIcon}
      alt=""/>
  );
}

export default FavoriteIcon;