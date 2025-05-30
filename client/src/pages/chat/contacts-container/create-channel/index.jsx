import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdGroupAdd } from "react-icons/md";
import { useState } from 'react';
import { apiClient } from '../../../../lib/api-client';
import { CREATE_CHANNEL_ROUTE, SEARCH_CONTACTS_ROUTE } from '../../../../utils/constant';
import { Button, Menu, MenuItem } from '@mui/material'
import { IoCloseOutline } from "react-icons/io5";
import {toast} from "react-toastify";
import { addChannel } from '../../../../store/chatSlice';
import { useDispatch } from 'react-redux';

const CreateChannel = () => {
    const [open, setOpen] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedContacts, setSearchedContacts] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [members, setMembers] = useState([]);
    
    const dispatch = useDispatch();

    const handleChannelName = (e) => {
        setChannelName(e.target.value);
    }
    const handleSearchContacts = async (e) => {
        const response = await apiClient.post(SEARCH_CONTACTS_ROUTE, { searchTerm }, { withCredentials: true });
        if (response.status === 200 && response.data.contacts) {
            setSearchedContacts(response.data.contacts);
        } else {
            setSearchedContacts([]);
        }
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearchContacts(value);

        // Only set anchorEl if input is not empty and the menu is not already open
        if (value.trim() !== '' && !anchorEl) {
            setAnchorEl(e.currentTarget);
        }

        // If input is cleared, close the menu
        if (value.trim() === '') {
            setAnchorEl(null);
        }
    };
    const handleClose = (contact) => {
        setAnchorEl(null);
        setMembers(prev => [...prev,contact]);
    }
    const handleRemoveMember = (contact) => {
        console.log("removed")
        setMembers(prev => prev.filter(c=>c._id !== contact._id));
    }

    const handleCreateChannel = async() =>{
        try{
            if (channelName.length==0){
                toast.warn("Channel Name is Required");
                return;
            }
            if (members.length==0){
                toast.warn("Two or More members required");
                return;
            }
            const response = await apiClient.post(CREATE_CHANNEL_ROUTE,{name:channelName,members:members.map((member)=>member._id),},{withCredentials:true});

            if (response.status===201){
                setChannelName("");
                setMembers([])
                setOpen(false)
                dispatch(addChannel(response.data.channel));
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <React.Fragment>
                <MdGroupAdd onClick={() => setOpen(true)} className='w-6 h-6' />
                <Dialog onClose={() => setOpen(false)} open={open} PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(229, 231, 235, 0.95)',
                        borderRadius: 2,
                        padding: 2,
                    }
                }}>
                    <DialogTitle className='w-96 flex justify-center '>
                        <p className='font-bold'>Create New Group</p>
                    </DialogTitle>
                    <DialogContent className="w-96 flex flex-col gap-4">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="channel-name"
                            label="Channel Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={channelName}
                            onChange={handleChannelName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="search-contact"
                            label="Search a Contact"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={searchTerm}
                            aria-controls={anchorEl ? 'dropdown-menu' : undefined}
                            aria-haspopup="true"
                            onChange={handleChange}
                        />
                        <Menu
                            id="dropdown-menu"
                            anchorEl={anchorEl} // This positions the menu relative to the button
                            open={Boolean(anchorEl) && searchedContacts.length > 0} // Menu is open if anchorEl is set
                            onClose={()=>setAnchorEl(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {searchedContacts.length > 0 && searchedContacts.map((contact, index) => {
                                return <MenuItem key={index} onClick={()=>handleClose(contact)}>{contact.firstName} {contact.lastName}</MenuItem>
                            })
                            }
                        </Menu>
                        {members.length>0 && <div className="max-w-96 max-h-20 flex flex-wrap gap-x-4 gap-y-2 overflow-y-auto">
                            {members.map((member,index)=>{
                                return <span className='bg-purple-400 rounded-md p-1 flex gap-1'>{member.firstName} {member.lastName} <IoCloseOutline onClick={()=>handleRemoveMember(member)} className='cursor-pointer w-5 h-5'/></span>
                            })}
                        </div> }
                        <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded" onClick={handleCreateChannel}>
                            Create Group
                        </button>
                    </DialogContent>

                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default CreateChannel;
