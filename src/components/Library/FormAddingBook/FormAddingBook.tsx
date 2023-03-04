import React, {useState, } from 'react'
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {collection, addDoc} from "firebase/firestore";
import {Formik, Form} from 'formik'
import BookCover from './steps/BookCover';
import BookDescription from './steps/BookDescription';
import BookTitle from './steps/BookTitle';
import styles from './FormAddingBooks.module.scss'
import NavButtons from "../../UI/addingBookForm/Buttons/NavButtons";
import WrapperFormAddingBook from "../../UI/wrappers/WrapperFormAddingBook/WrapperFormAddingBook";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {setVisibleAddingBookForm} from "../../../store/slices/accountSlice";
import {db, storage} from "../../../firebase";
import addingBookValidateSchema from "../../../utils/validate/addingBookValidateSchema";

interface IAddingBook {
  title: string,
  description: string,
  cover: any
}

export default function FormAddingBook() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({})
  const {visibleAddingBookForm} = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()
  const {id} = useAppSelector(state => state.account.user)
  const currentValidationSchema = addingBookValidateSchema[step]

  const renderSteps = (props: any) => {
    switch (step) {
      case 0: {
        return <BookTitle/>
      }
      case 1: {
        return <BookDescription {...props}/>;
      }
      case 2: {
        return <BookCover {...props}/>;
      }
      default:
        return null
    }
  }

  const handleSubmit = (values: IAddingBook, resetForm: any) => {
    const data = {...formData, ...values}
    setStep(step + 1)

    if (step === 2) {
      const metadata = {contentType: 'image/jpeg'};
      const storageRef = ref(storage, 'images/' + data.cover.name);
      const uploadTask = uploadBytesResumable(storageRef, data.cover, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, `books-user-${id}`), {
              title: data.title,
              description: data.description,
              cover: downloadURL,
              favorite: false
            });
          })
        }
      )
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
        cover: ''
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
