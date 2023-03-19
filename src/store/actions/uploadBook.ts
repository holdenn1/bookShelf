import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../../firebase";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import {fetchSeesBooksEveryone} from "./fetchSeesBooksEveryone";
import {IValues} from "../../components/Forms/AddingBookForm/AddingBookForm";
import {IBook, IUser} from "../../types";

type UploadBookProps = {
  data: IValues
  user: IUser
}

export const uploadBook = createAsyncThunk<IBook, UploadBookProps, { rejectValue: string }>(
  'user/uploadBook',
  async ({data, user}: UploadBookProps, {dispatch, rejectWithValue}) => {
    try {
      const metadata = {contentType: 'image/jpeg'};
      const storageRef = ref(storage, 'images/' + data.cover.name);
      const uploadBook = uploadBytesResumable(storageRef, data.cover, metadata);

      await new Promise((res, rej) => {
        uploadBook.on('state_changed', null, rej, res as () => void)
      })

      const downloadURL = await getDownloadURL(uploadBook.snapshot.ref)

      const dataBook: Omit<IBook, 'id'> = {
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
      return dataBook as IBook

    } catch (e) {
      console.error(e)
      return rejectWithValue('Invalid uploading. Try again later.')
    }
  }
)