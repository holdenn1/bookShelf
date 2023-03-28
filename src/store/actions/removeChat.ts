import {createAsyncThunk} from "@reduxjs/toolkit";
import {IBook, IChats, IUser} from "../../types";
import {arrayRemove, doc, updateDoc} from "firebase/firestore";
import {db, realTimeDb} from "../../firebase";
import {ref, remove} from "firebase/database";
import {fetchChats} from "./fetchChats";
import {fetchMessages} from "./fetchMessages";
import {notify} from "../../components/UI/Toast/Toast";
import {NavigateFunction} from 'react-router-dom'

interface IRemoveChatProps {
  booksSeesEveryone: IBook[]
  chat: IChats
  user: IUser
  navigate: NavigateFunction
}

export const removeChat = createAsyncThunk<void, IRemoveChatProps>(
  'user/removeChat',
  async ({booksSeesEveryone, chat, user, navigate}, {dispatch}) => {
    try {
      const currentBook: IBook = booksSeesEveryone.find((book) => book.id == chat.bookId)!

      const docUserRef = doc(db, `books-user-${currentBook.userId}`, `${currentBook.id}`);
      const docPublicRef = doc(db, `books-sees-everyone`, `${currentBook.booksEveryoneCollectionID}`)
      await updateDoc(docPublicRef, {usersWhoSendMessage: arrayRemove(chat.fromUserId)});
      await updateDoc(docUserRef, {usersWhoSendMessage: arrayRemove(chat.fromUserId)});

      await remove(ref(realTimeDb, `chats/${chat.chatId}`));
      await remove(ref(realTimeDb, `users/${chat.fromUserId}/chats/${chat.firstUserChatId}`));
      await remove(ref(realTimeDb, `users/${chat.toUserId}/chats/${chat.secondUserChatId}`));
      dispatch(fetchChats(user.id))
      dispatch(fetchMessages())
      navigate('/book-shelf/messages', {replace: true})
    } catch (e) {
      console.error(e)
      notify('An error occurred, please try again later', 'error')
    }
  }
)