import React, {useState} from 'react'
import {Formik, Form} from 'formik'
import BookCover from './steps/BookCover';
import BookDescription from './steps/BookDescription';
import BookTitle from './steps/BookTitle';
import styles from './AddingBooks.module.scss'
import NavButtons from "../UI/addingBookForm/Buttons/NavButtons";
import WrapperFormAddingBook from "../UI/addingBookForm/WrapperFormAddingBook/WrapperFormAddingBook";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setVisibleAddingBookForm} from "../../store/slices/librarySlice";

interface IAddingBook {
  title: string,
  description: string,
  cover: string
}

export default function AddingBook() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({})
  const {visibleAddingBookForm} = useAppSelector(state => state.library)
  const dispatch = useAppDispatch()


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

  const handleSubmit = (values: IAddingBook) => {
    const data = {...formData, ...values}
    setStep(step + 1)
    if (step === 2) {
      dispatch(setVisibleAddingBookForm(false))
      setStep(0)
      console.log(data)
    }
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        cover: ''
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}>
      {() => (
        <Form className={classNames(styles.wrapper, {[styles.activeForm]: visibleAddingBookForm})}>
          <WrapperFormAddingBook>
            {renderSteps()}
            <NavButtons step={step} setStep={setStep}/>
          </WrapperFormAddingBook>
        </Form>
      )}
    </Formik>
  )
}
