import React from 'react'
import a0 from "../../../../assets/a0.png";
import a1 from "../../../../assets/a1.png";
import a2 from "../../../../assets/a2.png";
import a3 from "../../../../assets/a3.png";
import a4 from "../../../../assets/a4.png";
import a5 from "../../../../assets/a5.png";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileInfo = () => {
    const navigate = useNavigate('/profile');
    const user = useSelector((state)=>state.user.user);
    const colors = [a0,a1,a2,a3,a4,a5];

    return (
        <div className='flex justify-center items-center gap-6 mb-5'>
            <Avatar sx={{width:'4rem', height:'4rem'}} src={user.image?user.image:colors[user.color]} className='border-2 border-black cursor-pointer' onClick={()=>navigate('/profile')}></Avatar>
            <p onClick={()=>navigate('/profile')} className='font-semibold text-2xl cursor-pointer'>{user.firstName} {user.lastName}</p>
        </div>
    )
}

export default ProfileInfo
