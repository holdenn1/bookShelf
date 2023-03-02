import React, {useState, useEffect, useRef} from 'react'
import {ref, getDownloadURL, uploadBytesResumable, uploadBytes} from "firebase/storage";
import {collection, addDoc, getDocs} from "firebase/firestore";
import {Formik, Form} from 'formik'
import BookCover from './steps/BookCover';
import BookDescription from './steps/BookDescription';
import BookTitle from './steps/BookTitle';
import styles from './FormAddingBooks.module.scss'
import NavButtons from "../UI/addingBookForm/Buttons/NavButtons";
import WrapperFormAddingBook from "../UI/addingBookForm/WrapperFormAddingBook/WrapperFormAddingBook";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {addBook, setVisibleAddingBookForm} from "../../store/slices/accountSlice";
import {db, storage} from "../../firebase";
import {log} from "util";

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


  const renderSteps = (props: any) => {
    switch (step) {
      case 0: {
        return <BookTitle/>
      }
      case 1: {
        return <BookDescription/>;
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
            addDoc(collection(db, "books"), {
              id: new Date().toISOString(),
              title: data.title,
              description: data.description,
              cover: downloadURL
            });
        /*    dispatch(addBook({
              id: new Date().toISOString(),
              title: data.title,
              description: data.description,
              cover: downloadURL
            }))*/
          })
        }
      )


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
