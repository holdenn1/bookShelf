import React from 'react'
import {Field} from 'formik'
import descriptionBook from '../../../img/icons/icons8-open-book-100.png'
import styles from './styles.module.scss'

export default function BookDescription() {
  return (
    <>
      <img className={styles.img} src={descriptionBook} alt=""/>
      <h3 className={styles.text}>What can you say about this book?</h3>
      <Field name="description" as="textarea" className={styles.descriptionBook}/>
    </>
  )
}
