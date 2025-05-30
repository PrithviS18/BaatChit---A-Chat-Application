import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import { setSelectedChatMessages } from '../../../../../store/chatSlice';
import { apiClient } from '../../../../../lib/api-client';
import { GET_ALL_MESSAGES_ROUTE, GET_CHANNEL_MESSAGES_ROUTE } from '../../../../../utils/constant';
import a0 from "../../../../../assets/a0.png";
import a1 from "../../../../../assets/a1.png";
import a2 from "../../../../../assets/a2.png";
import a3 from "../../../../../assets/a3.png";
import a4 from "../../../../../assets/a4.png";
import a5 from "../../../../../assets/a5.png";
import Avatar from '@mui/material/Avatar';

const MesssageContainer = () => {
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatMessages = useSelector((state) => state.chat.selectedChatMessages);
  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const colors = [a0, a1 , a2, a3, a4, a5];
  useEffect (()=>{

    const getMessages = async() => {
      try{
        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE,{id:selectedChatData._id},{withCredentials:true});

        if (response.data.messages){
          dispatch(setSelectedChatMessages(response.data.messages));
        }
      }catch(error){
        console.log(error.message);
      }
    }

    const getChannelMessages = async() => {
      // console.log(selectedChatData)
      try{
        const response = await apiClient.post(GET_CHANNEL_MESSAGES_ROUTE,{channelId:selectedChatData._id},{
          withCredentials:true
        });

        if (response.data.messages){
          dispatch(setSelectedChatMessages(response.data.messages));
        }
      }catch(error){
        console.log(error.message);
      }
    }

    if (selectedChatData._id){
      if (selectedChatType === "contact")getMessages();
      if (selectedChatType === "channel")getChannelMessages();
    }
  },[selectedChatData,selectedChatMessages, setSelectedChatMessages])

  

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = (messageDate !== lastDate);
      lastDate = messageDate; // For showing date only once

      return (
        <div key={message._id} className="">
          {showDate && (
            <div className="text-white text-center my-1">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
          {selectedChatType === "channel" && renderChannelMessages(message)}
        </div>
      )
    })
  }

  const renderDMMessages = (message) => {
    return <div className={`${message.sender === selectedChatData._id ?
      "text-left " : "text-right"}`}>

      {message.messageType === "text" && (
        <div className={`${message.sender === selectedChatData._id?
          "bg-purple-300":"bg-white text-black"
        } max-w-[50%] inline-block my-1 p-2 rounded-xl`}>
          {message.content}
        </div>
      )}
      <div className="text-white text-xs">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  }

  const renderChannelMessages = (message) => {
    console.log(message);
    console.log(userInfo)
    return <div className={`${message.sender._id === userInfo.id ?
      "text-left " : "text-right"}`}>

      {message.messageType === "text" && (
        <div className={`${message.sender._id === userInfo.id?
          "bg-purple-300":"bg-white text-black"
        } max-w-[50%] inline-block my-1 p-2 rounded-xl`}>
          <p className='flex gap-2 justify-between items-center font-semibold'><Avatar className='border-1' sx={{ width: '1.2rem', height: '1.2rem'}} src={message.sender.image? message.sender.image: colors[message.sender.color]}></Avatar> ~{message.sender.username}</p>
          {message.content}
        </div>
      )}
      <div className="text-white text-xs">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  }

  return (
    <div className='flex-1 h-[80vh] overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw]'>
      {renderMessages()}
    </div>
  )
}

export default MesssageContainer
