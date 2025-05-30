import React from 'react'
import { useSelector } from 'react-redux'

const EmptyChatContainer = () => {
    const userInfo = useSelector((state)=>state.user.user);

    return (
    <div className='flex-1  bg-gray-500 flex-col justify-center items-center flex'>
       <p className='text-5xl'>Hi <span className='text-orange-400'>{userInfo.firstName}</span>,</p> 
       <p className='text-4xl'>Welcome to  <span className='text-green-300'>Baatchit</span> App !!! </p>  
    </div>
  )
}

export default EmptyChatContainer
