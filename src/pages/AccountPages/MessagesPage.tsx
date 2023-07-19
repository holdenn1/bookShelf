import { useEffect } from 'react';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchChats } from '@/store/actions/fetchChats';
import MessagePageWrapper from '@/components/UI/wrappers/MessagePageWrapper';
import ChatList from '@/components/Library/Chat/ChatList';

function MessagesPage() {
  const { chats, user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats(user.id));
    
  }, []);

  return (
    <>
      {chats.length == 0 ? (
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            It is still empty here, write a review about the book to start communication
          </h3>
        </div>
      ) : (
        <MessagePageWrapper>
          <ChatList />
          <Outlet />
        </MessagePageWrapper>
      )}
    </>
  );
}

export default MessagesPage;
