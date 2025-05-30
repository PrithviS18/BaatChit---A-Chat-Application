import React from 'react'
import a0 from "../../../../assets/a0.png";
import a1 from "../../../../assets/a1.png";
import a2 from "../../../../assets/a2.png";
import a3 from "../../../../assets/a3.png";
import a4 from "../../../../assets/a4.png";
import a5 from "../../../../assets/a5.png";
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../../../lib/api-client';
import { GET_ALL_CONTACTS_ROUTE } from '../../../../utils/constant';
import { useState } from 'react';
import { setSelectedChatData, setSelectedChatType } from '../../../../store/chatSlice';


const AllContacts = () => {
    const selectedChatType = useSelector((state) => state.chat.selectedChatType);
    const selectedChatData = useSelector((state) => state.chat.selectedChatData);
    const dispatch = useDispatch();

    const [contacts, setContacts] = useState([]);
    const colors = [a0, a1, a2, a3, a4, a5];

    const getAllContacts = async () => {
        try {
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, { withCredentials: true });

            if (response.status === 200) {
                setContacts(response.data.users)
                console.log(response.data.users);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllContacts();
    }, [selectedChatType, selectedChatData]);


    const handleSelectContact = (item) => {
        console.log("clicked");
        dispatch(setSelectedChatData(item));
        dispatch(setSelectedChatType("contact"));
    }
    return (
        <div className='w-full flex flex-col gap-4 justify-center items-start'>
            {contacts.map((item, index) => {
                return <div className={`${selectedChatType === "contact" && selectedChatData._id === item._id ? "w-full flex bg-white text-black text-xl gap-4 p-2" : "w-full flex text-xl gap-4 p-2 hover:bg-gray-400"} cursor-pointer`} onClick={() => handleSelectContact(item)}>
                    <Avatar sx={{ width: '2rem', height: '2rem' }} src={item.image ? item.image : colors[item.color]} className='border-2 border-black cursor-pointer' ></Avatar>
                    <p>{item.firstName} {item.lastName}</p>
                </div>
            })}
        </div>
    )
}

export default AllContacts
