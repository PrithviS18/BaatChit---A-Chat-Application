import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IoMdPersonAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChatType, setSelectedChatData } from '../../../../store/chatSlice.js';
import { apiClient } from "../../../../lib/api-client.js";
import { SEARCH_CONTACTS_ROUTE } from '../../../../utils/constant';
import a0 from "../../../../assets/a0.png";
import a1 from "../../../../assets/a1.png";
import a2 from "../../../../assets/a2.png";
import a3 from "../../../../assets/a3.png";
import a4 from "../../../../assets/a4.png";
import a5 from "../../../../assets/a5.png";
import Avatar from '@mui/material/Avatar';


const NewDM = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedContacts, setSearchedContacts] = useState([]);
  const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const searchContacts = async (searchTerm) => {
    const response = await apiClient.post(SEARCH_CONTACTS_ROUTE, { searchTerm }, { withCredentials: true });
    if (response.status === 200 && response.data.contacts) {
      setSearchedContacts(response.data.contacts);
    } else {
      setSearchedContacts([]);
    }
  };

  const colors = [a0,a1,a2,a3,a4,a5];

  const selectNewContact = (contact) =>{
    setOpen(false);
    setSearchedContacts([]);
    setSearchTerm("");
    console.log(contact);
    dispatch(setSelectedChatType("contact"));
    dispatch(setSelectedChatData(contact));
  }
  return (
    <div>
      <React.Fragment>
        <IoMdPersonAdd onClick={() => setOpen(true)} className='w-6 h-6' />
        <Dialog onClose={() => setOpen(false)} open={open} PaperProps={{
          sx: {
            backgroundColor: 'rgba(229, 231, 235, 0.95)',
            borderRadius: 2,
            padding: 2,
          }
        }}>
          <DialogContent>
            <div className="w-96 rounded-md bg-gray-400 flex justify-start items-center gap-4 px-5 py-2">
              <IoSearch className='w-5 h-5 cursor-pointer' onClick={searchContacts} />
              <input type="text" value={searchTerm} onChange={(e) => { searchContacts(e.target.value); setSearchTerm(e.target.value) }} placeholder='Search Contacts' className='outline-none' />
            </div>
            {searchedContacts.length === 0 ?
              <div className="h-72 flex flex-col justify-center items-center">
                <p className='font-bold text-2xl'>Hi, {userInfo.firstName}</p>
                <p className='font-bold text-2xl'>Search new Contact</p>
              </div> :

              <div className="h-72 overflow-y-auto m-4">
                {searchedContacts.map((contact, index) => {
                  return <div className="flex justify-start gap-4 items-center" onClick={()=>selectNewContact(contact)} key={index}>
                    <Avatar sx={{ width: '3rem', height: '3rem' }} src={contact.image ? contact.image : colors[contact.color]} className='border-2 border-black cursor-pointer'></Avatar>

                    <div className="">
                    <p className='font-semibold text-2xl cursor-pointer'>{contact.firstName} {contact.lastName}</p>
                    <p className='font-semibold text-sm cursor-pointer'>{contact.username}</p>
                    </div>

                  </div>
                })}
              </div>
            }
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  )
}

export default NewDM
