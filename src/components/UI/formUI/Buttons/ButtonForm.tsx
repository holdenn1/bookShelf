import React from 'react';
import {IChildren} from "../../../../types";
import styles from './styles.module.scss'

function ButtonForm({children}: IChildren) {
  return (
    <>
      <button className={styles.formBtn}>{children}</button>
    </>
  );
}

export default ButtonForm;