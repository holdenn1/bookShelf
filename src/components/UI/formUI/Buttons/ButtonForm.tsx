import React from 'react';
import {IChildren} from "../../../../types";
import styles from './styles.module.scss'

function ButtonForm({children}: IChildren) {
  return (
    <>
      <button type='submit' className={styles.formBtn}>{children}</button>
    </>
  );
}

export default ButtonForm;