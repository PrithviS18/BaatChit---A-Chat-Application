import React from 'react'
import ChatHeader from "./components/chat-header/index.jsx";
import MessageBar from "./components/message-bar/index.jsx";
import MessageContainer from "./components/message-container/index.jsx";

const ChatContainer = () => {
  return (
    <div className='h-[100vh] md:w-[65vw] lg:w-[70vw] xl:w-[80vw] bg-gray-500 flex flex-col w-full'>
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default ChatContainer
