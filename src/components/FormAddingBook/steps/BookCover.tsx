import React from 'react'
import styles from "./styles.module.scss";
import coverBook from '../../../img/icons/icons8-book-96.png'
import {ErrorMessage} from "formik";

interface IFormikProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export default function BookCover({setFieldValue}: IFormikProps) {
  return (
    <>
      <img src={coverBook} alt=""/>
      <h3 className={styles.title}>Add a cover!</h3>
      <p className={styles.titleDescription}>It will make your library more convenient and stylish!</p>
      <p className={styles.instruction}>Click on the book</p>
      <p className={styles.errorMassage}><ErrorMessage name='cover'/></p>
      <input type="file" name='cover'
             onChange={((e) => {
               setFieldValue('cover', e.target.files?.[0])
             })}
             className={styles.addCover}/>
    </>
  )
}
