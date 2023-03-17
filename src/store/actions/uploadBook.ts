import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../../firebase";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";
import {IFormAddingBookProps, IValues} from "../../components/Forms/AddingBookForm/AddingBookForm";
import {IUser} from "../../types";

type UploadBookProps = IFormAddingBookProps & {
  data: IValues
  user: IUser
}

export const uploadBook = createAsyncThunk(
  'user/uploadBook',
  async ({data, user, setError, setLoading}: UploadBookProps, {dispatch}) => {
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
            userWhoUnlikesBook: [],
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
  }
)