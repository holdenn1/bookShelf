import { notify } from "@/components/UI/Toast";
import { realTimeDb } from "@/firebase";
import { IChats, IMessage } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, remove } from "firebase/database";

type RemoveMessageProps = {
  userId: string;
  message: IMessage;
  currentChat: IChats;
};

export const removeMessage = createAsyncThunk<void, RemoveMessageProps>(
  "user/removeMessage",
  async ({ message, currentChat, userId }) => {
    
    try {
      if (message.senderId === userId) {
        await remove(
          ref(
            realTimeDb,
            `chats/${currentChat.chatId}/messages/${message.messageId}`
          )
        );
      }
    } catch (e) {
      console.error(e);
      notify("An error occurred, please try again later", "error");
    }
  }
);
