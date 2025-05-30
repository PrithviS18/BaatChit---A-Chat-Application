import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import a0 from "../../assets/a0.png";
import a1 from "../../assets/a1.png";
import a2 from "../../assets/a2.png";
import a3 from "../../assets/a3.png";
import a4 from "../../assets/a4.png";
import a5 from "../../assets/a5.png";
import { apiClient } from '../../lib/api-client';
import { ADD_PROFILE_IMAGE, DELETE_PROFILE_IMAGE, LOGOUT_ROUTE, UPDATE_PROFILE } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user.user)
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setuser] = useState(reduxUser);

  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    setuser(reduxUser);

    if (user.image) setImage(user.image);
    else setImage("");

    if (user.profileSetup) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setSelectedColor(user.color || 0);
    }
  }, [user, dispatch]);

  const colors = [a0, a1, a2, a3, a4, a5];

  const validateProfile = () => {
    if (!firstName.length) {
      toast.warn("First Name Required")
      return false;
    }
    if (!lastName.length) {
      toast.warn("Last Name Required")
      return false;
    }
    return true;
  }

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE, { firstName, lastName, color: selectedColor }, { withCredentials: true });
        if (response.status === 200) {
          dispatch(setUser(response.data.user));
          setuser(response.data.user);
          toast.success("Profile Updated Successfully")
          navigate('/chat')
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  const handleLogOut = async() => {
    try{
      const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true});

      if (response.status === 200){
        toast.success("Logged Out");
        navigate("/auth")
      }
    }catch(error){
      console.log(error.message);
    }
  }

  const handleFileClick = () => {
    fileInputRef.current.click();
  }
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("profile-image", file);
      formData.append("color", 6);
    }
    try {
      const response = await apiClient.post(ADD_PROFILE_IMAGE, formData, { withCredentials: true });

      if (response.status === 200 && response.data.user.image) {
        console.log("yes")
        toast.success("Image Uploaded");
        dispatch(setuser(response.data.user));
        setuser(response.data.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(DELETE_PROFILE_IMAGE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Image Deleted");
        dispatch(setuser(response.data.user));
        setuser(response.data.user);
        setImage("")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='bg-[#6bf5daef] h-[100vh] w-[100vw] flex justify-center flex-col items-center gap-10'>
      <div className="flex justify-center items-center gap-10">

        <div className="flex flex-col gap-4">
          {image ? <Avatar src={image} sx={{ border: '2px solid black', width: '8rem', height: '8rem' }} /> : < Avatar src={colors[selectedColor]} sx={{ width: '8rem', height: '8rem' }} />}
          <Button onClick={image ? handleDeleteImage : handleFileClick} sx={{ '&:hover': { backgroundColor: 'blue', color: 'white' } }} variant="outlined">{image ? <p>DELETE IMAGE</p> : <p>UPLOAD IMAGE</p>}</Button>
          <input type="file" ref={fileInputRef} className='hidden' onChange={handleUploadImage} name='profile-image' accept='.png, .jpg, .jpeg, .svg, .webp' />
        </div>

        <div className="flex justify-center items-center flex-col gap-4">
          <TextField className='w-80' id="filled-basic" label="Email" variant="filled" value={user.email} />
          <TextField className='w-80' id="filled-basic" label="First Name" variant="filled" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextField className='w-80' id="filled-basic" label="Last Name" variant="filled" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

      </div>
      <div className='flex justify-center items-center gap-4'>
        {colors.map((item, index) => {
          return <Avatar key={index} src={item} onClick={() => setSelectedColor(index)} sx={selectedColor === index ? { border: '2px solid black', width: '5rem', height: '5rem' } : { '&:hover': { width: '5rem', height: '5rem' }, width: '4rem', height: '4rem' }} />
        })}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button onClick={saveChanges} className='w-64' variant="contained">Save Changes</Button>
        <Button onClick={handleLogOut} className='w-64' variant="contained">Log Out</Button>
      </div>

    </div>
  )
}

export default Profile
