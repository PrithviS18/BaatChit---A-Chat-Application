import React, { useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useSocket } from '../../../../../context/SocketContext';

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const userInfo = useSelector((state) => state.user.user);


  const handleSendMessage = () => {
    console.log(userInfo);
    if (!message.trim() || !socket) {
      return; // check for null
    }
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        recipient: selectedChatData._id,
        messageType: "text",
        content: message,
        fileUrl: undefined,
      });
    }else if (selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender:userInfo.id,
        content: message,
        messageType: "text",
        fileUrl: undefined,
        channelId: selectedChatData._id,
      })
    }

    setMessage("");
  };



  return (
    <div className='h-[10vh] w-full flex justify-center items-center px-8 gap-6'>

      {/* Message Input Container */}
      <div className="flex bg-gray-400 rounded-xl items-center gap-5 mb-5 pr-5 w-full">

        {/* Full Width Input */}
        <input
          type="text"
          className='w-full p-5 bg-transparent rounded-md focus:outline-none'
          placeholder='Enter Message'
          onChange={(e) => setMessage(e.target.value)}
        />

        <GrAttachment className='cursor-pointer' />
      </div>

      {/* Send Icon */}
      <IoSend onClick={handleSendMessage} className='text-2xl hover:text-gray-300 mb-5 cursor-pointer' />
    </div>
  )
}

export default MessageBar
