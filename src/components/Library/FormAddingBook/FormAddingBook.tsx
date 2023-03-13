import React, {useState,} from 'react'
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {collection, addDoc, setDoc, doc} from "firebase/firestore";
import {Formik, Form} from 'formik'
import BookCover from './steps/BookCover';
import BookDescription from './steps/BookDescription';
import BookTitle from './steps/BookTitle';
import styles from './FormAddingBooks.module.scss'
import NavButtons from "../../UI/addingBookForm/Buttons/NavButtons";
import WrapperFormAddingBook from "../../UI/wrappers/WrapperFormAddingBook/WrapperFormAddingBook";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {setVisibleAddingBookForm} from "../../../store/slices/mainSlice";
import {db, storage} from "../../../firebase";
import addingBookValidateSchema from "../../../utils/validate/addingBookValidateSchema";
import {fetchSeesBooksEveryone} from "../../../store/actions/fetchSeesBooksEveryone";

interface IValues {
  title: string,
  description: string,
  cover: any
  seesEveryone: boolean
}

interface IFormAddingBookProps {
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormAddingBook({setError, setLoading}: IFormAddingBookProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({})
  const {visibleAddingBookForm} = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()
  const {user, library} = useAppSelector(state => state.account)
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

  const handleSubmit = async (values: IValues, resetForm: any) => {
    const data = {...formData, ...values}
    setStep(step + 1)

    if (step === 2) {
      const metadata = {contentType: 'image/jpeg'};
      const storageRef = ref(storage, 'images/' + data.cover.name);
      const uploadBook = uploadBytesResumable(storageRef, data.cover, metadata);

      uploadBook.on('state_changed',
        (snapshot) => {
          switch (snapshot.state) {
            case 'paused':
              setLoading(false)
              break;
            case 'running':
              setError('')
              setLoading(true);
              break;
          }
        },
        (error) => {
          setError('Invalid uploading. Try again later.')
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadBook.snapshot.ref)
            const dataBook = {
              userId: user.id,
              title: data.title,
              description: data.description,
              cover: downloadURL,
              favorite: false,
              seesEveryone: data.seesEveryone,
              userWhoLikesBook: [],
              rating: 0
            }
            if (data.seesEveryone) {
              const userCollectionRef = collection(db, `books-user-${user.id}`);
              const booksEveryoneCollectionRef = collection(db, `books-sees-everyone`)
              const booksEveryoneCollection = await addDoc(booksEveryoneCollectionRef, dataBook);
              const userCollection = await addDoc(userCollectionRef, {
                ...dataBook,
                booksEveryoneCollectionID: booksEveryoneCollection.id
              });
              await setDoc(doc(db, `books-sees-everyone`, `${booksEveryoneCollection.id}`),
                {
                  id: userCollection.id,
                  booksEveryoneCollectionID: booksEveryoneCollection.id
                }, {merge: true});
              dispatch(fetchSeesBooksEveryone())
            } else {
              await addDoc(collection(db, `books-user-${user.id}`), dataBook)
            }
            setLoading(false)
          } catch (e) {
            console.error(e)
            setError('Invalid uploading. Try again later.')
          }
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
