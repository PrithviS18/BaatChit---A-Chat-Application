import React from 'react'
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../../../lib/api-client';
import { GET_ALL_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE } from '../../../../utils/constant';
import { useState } from 'react';
import { setSelectedChatData, setSelectedChatType } from '../../../../store/chatSlice';


const AllGroups = () => {
    const selectedChatType = useSelector((state) => state.chat.selectedChatType);
    const selectedChatData = useSelector((state) => state.chat.selectedChatData);
    const dispatch = useDispatch();

    const [groups, setGroups] = useState([]);

    const getAllGroups = async () => {
        try {
            const response = await apiClient.get(GET_ALL_CHANNEL_ROUTE, { withCredentials: true });

            if (response.status === 201) {
                setGroups(response.data.channels)
                console.log(response.data.channels);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllGroups();
    }, [selectedChatType, selectedChatData]);


    const handleSelectGroup = (item) => {
        console.log("clicked");
        dispatch(setSelectedChatData(item));
        dispatch(setSelectedChatType("channel"));
    }
    return (
        <div className='w-full flex flex-col gap-4 justify-center items-start'>
            {groups.map((item, index) => {
                return <div className={`${selectedChatType === "channel" && selectedChatData._id === item._id ? "w-full flex bg-white text-black text-xl gap-4 p-2" : "w-full flex text-xl gap-4 p-2 hover:bg-gray-400"} cursor-pointer`} onClick={() => handleSelectGroup(item)}>
                    <Avatar sx={{ width: '2rem', height: '2rem' }}  className='border-2 border-black cursor-pointer' ></Avatar>
                    <p>{item.name} </p>
                </div>
            })}
        </div>
    )
}

export default AllGroups;
