import { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { HOST } from "../utils/constant";
import { addMessage } from "../store/chatSlice";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null); // ✅ state will re-render provider

  const userInfo = useSelector((state) => state.user.user);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) return;

    const newSocket = io(HOST, {
      withCredentials: true,
      query: { userId: userInfo.id },
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    newSocket.on("receiveMessage", (message) => {
      const isRelevant =
        selectedChatType !== undefined &&
        (selectedChatData?._id === message.sender._id ||
          selectedChatData?._id === message.recipient._id);

      console.log(message);
      if (isRelevant) {
        dispatch(addMessage(message));
      }
    });

    newSocket.on("receive-channel-message", (message) => {
      if (selectedChatType !== undefined || selectedChatData._id === message.channelId){
        dispatch(addMessage(message));
      }
    })

    setSocket(newSocket); // ✅ update state to trigger re-render
    return () => {
      newSocket.disconnect();
    };
  }, [userInfo, selectedChatData, selectedChatType, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
