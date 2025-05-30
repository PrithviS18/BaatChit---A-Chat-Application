import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactsContainer from './contacts-container';
import EmptyChatContainer from './empty-chat-container';
import ChatContainer from './chat-container';



const Chat = () => {
  const userInfo = useSelector((state)=>state.user.user);
  const navigate = useNavigate();
  const selectedChatType =useSelector((state)=>state.chat.selectedChatType);

  useEffect(()=>{
    if (!userInfo.profileSetup){
      toast.warn("Please Setup Profile");
      navigate('/profile');
    }
  },[userInfo,navigate])
  
  return (
    <div className='flex h-[100vh] w-[100vw] overflow-hidden text-white'>
      <ContactsContainer/>
      {selectedChatType === undefined?<EmptyChatContainer/>:
      <ChatContainer/>}
    </div>
  )
}

export default Chat;


