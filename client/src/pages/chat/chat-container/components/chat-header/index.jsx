import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { closeChat } from '../../../../../store/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import a0 from "../../../../../assets/a0.png";
import a1 from "../../../../../assets/a1.png";
import a2 from "../../../../../assets/a2.png";
import a3 from "../../../../../assets/a3.png";
import a4 from "../../../../../assets/a4.png";
import a5 from "../../../../../assets/a5.png";
import Avatar from '@mui/material/Avatar';


const ChatHeader = () => {
  const dispatch = useDispatch();
  const handleCloseChat = () => {
    dispatch(closeChat());
  }
  const selectedChatType = useSelector((state)=> state.chat.selectedChatType);
  const selectedChatData = useSelector((state)=> state.chat.selectedChatData);
  console.log(selectedChatData);

  const colors = [a0,a1,a2,a3,a4,a5];
  return (
    <div className='px-4 h-[10vh] border-b-2 border-black flex items-center justify-between'>
      <div className="flex gap-5 items-center justify-between w-full">
        { selectedChatType === "contact"? 
          <div className="flex  justify-center items-center gap-5">
          <Avatar sx={{ width: '3.5rem', height: '3.5rem' }} src={selectedChatData.image ? selectedChatData.image : colors[selectedChatData.color]} className='border-2 border-black cursor-pointer' ></Avatar>
          <p className='font-semibold text-2xl cursor-pointer'>{selectedChatData.firstName} {selectedChatData.lastName}</p>
        </div>:
        <div className="flex  justify-center items-center gap-5">
          <Avatar sx={{ width: '3.5rem', height: '3.5rem' }}  className='border-2 border-black cursor-pointer' ></Avatar>
          <p className='font-semibold text-2xl cursor-pointer'>{selectedChatData.name}</p>
        </div>
        }
        <div className="flex items-center justify-center gap-5">
          <IoMdCloseCircleOutline className='text-4xl text-gray-300 hover:text-white' onClick={handleCloseChat} />
        </div>
      
      </div>
    </div>
  )
}

export default ChatHeader
