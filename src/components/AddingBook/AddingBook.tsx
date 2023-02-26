import React, {useState} from 'react'
import BookCover from './steps/BookCover';
import BookDescription from './steps/BookDescription';
import BookTitle from './steps/BookTitle';
import styles from './AddingBooks.module.scss'

export default function AddingBook() {
  const [step, setStep] = useState(0);

  const renderSteps = () => {
    switch (step) {
      case 0: {
        return <BookTitle/>
      }
      case 1: {
        return <BookDescription/>;
      }
      case 2: {
        return <BookCover/>;
      }
      default:
        return null
    }
  }
  return (
    <div className={styles.wrapper}>
      <BookCover/>
    </div>
  )
}
