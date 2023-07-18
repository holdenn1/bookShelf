import { useEffect, useRef, useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import arrowLeft from "@/img/icons/icons8-go-back-24.png";
import arrowRight from "@/img/icons/icons8-forward-button-24.png";
import arrowDown from "@/img/icons/icons8-arrow-down-50.png";
import removeIcon from "@/img/icons/icons8-remove-30.png";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchMessages } from "@/store/actions/fetchMessages";
import { setVisibleChatList } from "@/store/slices/mainSlice";
import ChatForm from "@/components/Forms/ChatForm";
import { removeMessage } from "@/store/actions/removeMessage";
import { IMessage } from "@/types";

function ChatWindow() {
  const { user, messages, chats } = useAppSelector((state) => state.account);
  const { isOpenChatList } = useAppSelector((state) => state.main);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [showChatMenu, setShowChatMenu] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const { chatId } = useParams();
  const chatRef = useRef<HTMLDivElement>(null);
  const countScroll = useRef(0);
  const prevScrollTop = useRef(0);
  const dispatch = useAppDispatch();

  const currentChat = chats.find((chat) => chat.chatId == chatId)!;
  const menuNode = document.querySelector('[data-foo="menu"]');
  const prevMenu = document.querySelectorAll('[data-foo="menu"]');

  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [chatId]);

  useEffect(() => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      if (countScroll.current > 0) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight - chatContainer.clientHeight,
          behavior: "smooth",
        });
      } else if (countScroll.current === 0) {
        chatContainer.scrollTop =
          chatContainer.scrollHeight - chatContainer.clientHeight;
        countScroll.current += 1;
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

      if (scrollHeight - scrollTop - clientHeight <= 300) {
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

  const handleMenu = (event: MouseEvent<HTMLLIElement>, message: IMessage) => {
    setSelectedMessage(message);

    event.stopPropagation();
    if (message.senderId === user.id) {
      setShowChatMenu(!showChatMenu);
      event.currentTarget.setAttribute("data-foo", "menu");
      if (showChatMenu) {
        prevMenu.forEach((element) => {
          element.removeAttribute("data-foo");
        });
      }
    } else {
      setShowChatMenu(false);
      if (showChatMenu) {
        prevMenu.forEach((element) => {
          element.removeAttribute("data-foo");
        });
      }
    }
  };

  const deleteMessage = (message: IMessage) => {
    dispatch(removeMessage({ currentChat, message, userId: user.id }));
    setSelectedMessage(null);
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
        <h3>{currentChat?.bookTitle}</h3>
      </div>
      <div
        ref={chatRef}
        className={styles.chatWrapper}
        onClick={(e) => {
          setShowChatMenu(false);
        }}
      >
        <ul className={styles.chat}>
          {messages.length ? (
            messages.map((message) => (
              <li
                key={message.messageId}
                className={classNames(styles.receiveUser, {
                  [styles.sendingUser]: message.senderId === user.id,
                })}
                onClick={(event: MouseEvent<HTMLLIElement>) =>
                  handleMenu(event, message)
                }
              >
                <span className={styles.message}>{message.message}</span>
              </li>
            ))
          ) : (
            <p className={styles.emptyChat}>
              The chat is empty, write a message first
            </p>
          )}
          {showChatMenu &&
            menuNode &&
            createPortal(
              <div className={styles.chatMenu}>
                <ul className={styles.chatMenuList}>
                  <li
                    className={styles.chatMenuItem}
                    onClick={() => {
                      if (selectedMessage) {
                        deleteMessage(selectedMessage);
                      }
                    }}
                  >
                    <img src={removeIcon} alt="" /> <span>Remove</span>
                  </li>
                </ul>
              </div>,
              menuNode
            )}
        </ul>

        <img
          src={arrowDown}
          className={classNames(styles.scrollToBottomBtn, {
            [styles.scrollToBottomBtnActive]: showScrollButton,
          })}
          onClick={handleScrollToBottom}
        />
      </div>

      <ChatForm setShowChatMenu={setShowChatMenu} prevMenu={prevMenu} />
    </div>
  );
}

export default ChatWindow;
