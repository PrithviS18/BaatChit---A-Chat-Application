import React, {  useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlice'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constant'

const App = () => {

  const user = useSelector((state)=>state.user.user);
  const dispatch = useDispatch();

  const [loading,setloading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try{
        const response = await apiClient.get(GET_USER_INFO, {withCredentials:true});
        if (response.status === 200){
          dispatch(setUser(response.data.user))
        }
      }catch(error){
        console.log(error.message);
      } finally{
        setloading(false)
      }
    };

    if (!user){
      getUserData();
    }else {
      setloading(false)
    }
  },[user,dispatch])

  if (loading){
    return <div className="text-2xl flex justify-center items-center h-full w-[100vw]">Loading .....</div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
      <ToastContainer
        position="top-right"           // You can change this to top-center, bottom-left, etc.
        autoClose={3000}               // Duration in milliseconds
        hideProgressBar={false}        // Show or hide the progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"                // Options: "light", "dark", "colored"
      />
    </BrowserRouter>
  )
}

export default App

