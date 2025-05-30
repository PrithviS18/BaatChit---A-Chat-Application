// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedChatType: undefined,// or { id, email, name, etc. }
    selectedChatData: undefined,
    selectedChatMessages: [],
    channels:[],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedChatType: (state, action) => {
            state.selectedChatType = action.payload;
        },
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload;
        },
        setSelectedChatMessages: (state, action) => {
            state.selectedChatMessages = action.payload;
        },
        setChannels: (state,action) => {
            state.channels = action.payload;
        },
        closeChat: () => {
            return initialState;
        },
        addMessage: (state,action) => {
            const message = action.payload;

            state.selectedChatMessages.push(
                {
                    ...message,
                    recipient:
                        state.selectedChatType === "channel" ?
                            message.recipient : message.recipient._id,
                    sender:
                        state.selectedChatType === "channel" ?
                            message.sender : message.sender._id,
                }
            )
        },
        addChannel: (state,action) => {
            const channels = state.channels;
            state.channels = [channels,...state.channels];
        }
    },
});

export const { setSelectedChatType, setSelectedChatData, setSelectedChatMessages, closeChat, addMessage, setChannels, addChannel } = chatSlice.actions;
export default chatSlice.reducer;
