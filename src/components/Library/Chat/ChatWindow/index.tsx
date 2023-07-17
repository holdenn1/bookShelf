import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import arrowLeft from "@/img/icons/icons8-go-back-24.png";
import arrowRight from "@/img/icons/icons8-forward-button-24.png";
import arrowDown from "@/img/icons/icons8-arrow-down-50.png";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchMessages } from "@/store/actions/fetchMessages";
import { setVisibleChatList } from "@/store/slices/mainSlice";
import ChatForm from "@/components/Forms/ChatForm";

function ChatWindow() {
  const { user, messages, chats } = useAppSelector((state) => state.account);
  const { isOpenChatList } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const { chatId } = useParams();
  const chatTitle = chats.filter((chat) => chat.chatId == chatId);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const countScroll = useRef(0);
  const prevScrollTop = useRef(0);

  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [chatId]);

  useEffect(() => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      const lastMessage = messages[messages.length - 1];
      const scrollTop = chatContainer.scrollTop;
      const clientHeight = chatContainer.clientHeight;
      const scrollHeight = chatContainer.scrollHeight;

      if (countScroll.current > 0 && user.id === lastMessage.senderId) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight - chatContainer.clientHeight,
          behavior: "smooth",
        });
      } else if (countScroll.current === 0) {
        chatContainer.scrollTop =
          chatContainer.scrollHeight - chatContainer.clientHeight;
        countScroll.current += 1;
      }
      if (scrollHeight - scrollTop - clientHeight <= 400) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight - chatContainer.clientHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  useEffect(() => {
    countScroll.current = 0;
    prevScrollTop.current = 0;
  }, [chatId]);

  const handleScroll = () => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      const scrollTop = chatContainer.scrollTop;
      const clientHeight = chatContainer.clientHeight;
      const scrollHeight = chatContainer.scrollHeight;

      prevScrollTop.current = chatContainer.scrollTop;

      if (scrollHeight - scrollTop - clientHeight <= 400) {
        setShowScrollButton(false);
      } else if (scrollTop > clientHeight / 2) {
        setShowScrollButton(true);
      }
    }
  };

  useEffect(() => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => {
        chatContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScrollToBottom = () => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight - chatContainer.clientHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.window}>
      <div className={styles.head}>
        {isOpenChatList ? (
          <img
            src={arrowRight}
            className={styles.chatListImg}
            onClick={() => dispatch(setVisibleChatList(false))}
            alt=""
          />
        ) : (
          <img
            src={arrowLeft}
            className={styles.chatListImg}
            onClick={() => dispatch(setVisibleChatList(true))}
            alt=""
          />
        )}
        {chatTitle.map((title) => (
          <h3 key={title.chatId}>{title.bookTitle}</h3>
        ))}
      </div>
      <div ref={chatRef} className={styles.chatWrapper}>
        <ul className={styles.chat}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={classNames(styles.receiveUser, {
                [styles.sendingUser]: message.senderId === user.id,
              })}
            >
              <span>{message.message}</span>
            </li>
          ))}
        </ul>
        {showScrollButton && (
          <img
            src={arrowDown}
            className={styles.scrollToBottomBtn}
            onClick={handleScrollToBottom}
          />
        )}
      </div>

      <ChatForm />
    </div>
  );
}

export default ChatWindow;
