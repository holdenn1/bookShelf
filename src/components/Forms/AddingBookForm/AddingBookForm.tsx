import React, {useState,} from 'react'
import {Formik, Form} from 'formik'
import BookCover from './steps/BookCover';
import BookDescription from './steps/BookDescription';
import BookTitle from './steps/BookTitle';
import styles from './AddingBooksForm.module.scss'
import NavButtons from "../../UI/addingBookForm/Buttons/NavButtons";
import WrapperFormAddingBook from "../../UI/wrappers/WrapperFormAddingBook/WrapperFormAddingBook";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {setVisibleAddingBookForm} from "../../../store/slices/mainSlice";
import addingBookValidateSchema from "../../../utils/validate/addingBookValidateSchema";
import {uploadBook} from "../../../store/actions/uploadBook";

export interface IValues {
  title: string,
  description: string,
  cover: any
  seesEveryone: boolean
}

export default function AddingBookForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({})
  const {visibleAddingBookForm} = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()
  const {user, library} = useAppSelector(state => state.account)
  const currentValidationSchema = addingBookValidateSchema[step]
  const stepsComponents = [BookTitle, BookDescription, BookCover]

  const renderSteps = (props: any) => {
    const Component = stepsComponents[step]
    return <Component {...props}/>
  }

  const handleSubmit = (values: IValues, resetForm: any) => {
    const data: IValues = {...formData, ...values}
    setStep(step + 1)
    if (step === stepsComponents.length - 1) {
      dispatch(uploadBook({data, user}))
      dispatch(setVisibleAddingBookForm(false))
      setStep(0)
      resetForm()
    }
  }


  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        cover: '',
        seesEveryone: false
      }}
      validationSchema={currentValidationSchema}
      onSubmit={(values, {resetForm}) => {
        handleSubmit(values, resetForm)
      }}>
      {(props) => (
        <Form className={classNames(styles.wrapper, {[styles.activeForm]: visibleAddingBookForm})}>
          <WrapperFormAddingBook>
            {renderSteps(props)}
            <NavButtons step={step} setStep={setStep}/>
          </WrapperFormAddingBook>
        </Form>
      )}
    </Formik>
  )
}
