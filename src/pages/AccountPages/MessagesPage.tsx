import React from 'react';
import ChatList from "../../components/Library/Chat/ChatList/ChatList";
import {Outlet} from 'react-router-dom'
import MessagePageWrapper from "../../components/UI/wrappers/MessagePageWrapper/MessagePageWrapper";


function MessagesPage() {

  return (
    <MessagePageWrapper>
      <ChatList/>
      <Outlet/>
    </MessagePageWrapper>
  );
}

export default MessagesPage;