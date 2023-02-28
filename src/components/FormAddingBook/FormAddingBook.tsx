import React, {useState} from 'react'
import {Formik, Form} from 'formik'
import BookCover from './steps/BookCover';
import BookDescription from './steps/BookDescription';
import BookTitle from './steps/BookTitle';
import styles from './FormAddingBooks.module.scss'
import NavButtons from "../UI/addingBookForm/Buttons/NavButtons";
import WrapperFormAddingBook from "../UI/addingBookForm/WrapperFormAddingBook/WrapperFormAddingBook";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setVisibleAddingBookForm} from "../../store/slices/accountSlice";

interface IAddingBook {
  title: string,
  description: string,
  cover: string
}

export default function FormAddingBook() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({})
  const {visibleAddingBookForm} = useAppSelector(state => state.account)
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

  const handleSubmit = (values: IAddingBook, resetForm: any) => {
    const data = {...formData, ...values}
    setStep(step + 1)
    if (step === 2) {
      dispatch(setVisibleAddingBookForm(false))
      setStep(0)
      console.log(data)
      resetForm()
    }
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        cover: ''
      }}
      onSubmit={(values, {resetForm}) => {
        handleSubmit(values, resetForm)
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
