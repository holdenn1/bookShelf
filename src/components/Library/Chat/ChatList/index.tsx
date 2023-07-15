import styles from "./styles.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import removeChatImg from "@/img/icons/icons8-delete-24.png";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { IChats } from "@/types";
import { removeChat } from "@/store/actions/removeChat";
import { useEffect } from "react";
import { setVisibleChatList } from "@/store/slices/mainSlice";

function ChatList() {
  const { chats, user } = useAppSelector((state) => state.account);
  const { isOpenChatList } = useAppSelector((state) => state.main);
  const activeLink = ({ isActive }: any) =>
    isActive ? styles.activeLink : styles.link;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemove = async (chat: IChats) => {
    dispatch(removeChat({ chat, user, navigate }));
  };

  useEffect(() => {
    dispatch(setVisibleChatList(false));
  }, []);

  return (
    <nav
      className={classNames(styles.nav, { [styles.isOpenNav]: isOpenChatList })}
    >
      <ul className={styles.list}>
        {chats.map((chat, index) => (
          <NavLink
            key={index}
            className={activeLink}
            to={`/book-shelf/messages/${chat.chatId}`}
          >
            <li className={styles.item}>
              {chat.fromUserEmail ? chat.fromUserEmail : chat.toUserEmail}
            </li>
            <p className={styles.titleBook}>Book: {chat.bookTitle}</p>
            <img
              onClick={() => handleRemove(chat)}
              className={styles.removeChat}
              src={removeChatImg}
              alt=""
            />
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default ChatList;
