import { createAsyncThunk } from "@reduxjs/toolkit";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { ref, remove } from "firebase/database";
import { fetchChats } from "./fetchChats";
import { fetchMessages } from "./fetchMessages";
import { NavigateFunction } from "react-router-dom";
import { IBook, IChats, IUser } from "@/types";
import { db, realTimeDb } from "@/firebase";
import { notify } from "@/components/UI/Toast";

interface IRemoveChatProps {
  chat: IChats;
  user: IUser;
  navigate: NavigateFunction;
}

export const removeChat = createAsyncThunk<void, IRemoveChatProps>(
  "user/removeChat",
  async ({ chat, user, navigate }, { dispatch }) => {
    try {
      const docUserRef = doc(
        db,
        `books-user-${chat.toUserId || chat.fromUserId}`,
        `${chat.bookId}`
      );
      const docPublicRef = doc(
        db,
        `books-sees-everyone`,
        `${chat.booksEveryoneCollectionID}`
      );
      await updateDoc(docPublicRef, {
        usersWhoSendMessage: arrayRemove(chat.fromUserId),
      });
      await updateDoc(docUserRef, {
        usersWhoSendMessage: arrayRemove(chat.fromUserId),
      });

      await remove(ref(realTimeDb, `chats/${chat.chatId}`));
      await remove(
        ref(
          realTimeDb,
          `users/${chat.fromUserId}/chats/${chat.firstUserChatId}`
        )
      );
      await remove(
        ref(realTimeDb, `users/${chat.toUserId}/chats/${chat.secondUserChatId}`)
      );

      dispatch(fetchChats(user.id));
      dispatch(fetchMessages());
      navigate("/book-shelf/messages", { replace: true });
    } catch (e) {
      console.error(e);

      notify("An error occurred, please try again later", "error");
    }
  }
);
