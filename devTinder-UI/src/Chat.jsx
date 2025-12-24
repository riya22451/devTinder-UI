import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import axios from "axios";
import {API_BASE_URL} from "../src/utils/constants"
const Chat = () => {
  const { targetUserId} = useParams();
  const socketRef = useRef(null);



  const user = useSelector((store) => store.userReducer);
  const connections = useSelector((store) => store.connections);

  // ✅ FIND the correct connection (NOT map)
  const conn = connections?.find(
  (u) => String(u._id) === String(targetUserId)
);
const FetchChatMessages = async () => {
  try {
    const res = await axios.get(
      "https://dev-tinder-backend-taupe.vercel.app/"+`chat/${targetUserId}`,
      { withCredentials: true }
    );  

    console.log(res.data.messages);
  } catch (error) {
    console.error("FetchChatMessages error:", error.response?.data || error.message);
  }
};
useEffect(()=>{
  FetchChatMessages()
},[])

  // ✅ State that updates when conn becomes available
  const [otherUser, setOtherUser] = useState({
    name: "",
    photoUrl: "",
  });

  useEffect(() => {
    if (conn) {
      setOtherUser({
        name: `${conn.firstName} ${conn.lastName}`,
        photoUrl: conn.photoUrl,
      });
    }
  }, [conn]);
  

useEffect(()=>{
  if(!user?._id){
    return;
  }
 socketRef.current = createSocketConnection();
socketRef.current.emit("joinChat", {
  userId: user?._id,
  targetUserId: targetUserId,
});
 socketRef.current.on("receiveMessage", ({ senderId, text }) => {
    
 setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        sender: senderId,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

  });
return ()=>{
  socketRef.current.disconnect()
}
},[user?._id,targetUserId])
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // Logged-in user photo
  const myPhoto = user?.photoUrl;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    
    if (!text.trim()) return;
    
    socketRef?.current?.emit("sendMessage",{firstName:user?.firstName,userId:user?._id,targetUserId,text})
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now(),
    //     text,
    //     sender: "me",
    //     time: new Date().toLocaleTimeString([], {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     }),
    //   },
    // ]);
    setText("");
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-3xl mx-auto
      bg-white dark:bg-gray-700
      border border-gray-200 dark:border-gray-700
      rounded-xl shadow-lg mt-2">

      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700
        flex items-center gap-3">
        <img
          src={otherUser.photoUrl || "https://via.placeholder.com/150"}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">
          {otherUser.name || "Chat"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4
        bg-gray-50 dark:bg-gray-800">

        {messages.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 mt-10">
            Start the conversation 👋
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.sender === user?._id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Other user photo */}
            {msg.sender !== user?._id && (
              <img
                src={otherUser.photoUrl || "https://via.placeholder.com/150"}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}

            {/* Message bubble */}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm
                ${
                  msg.sender === user?._id
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-none"
                }`}
            >
              <p>{msg.text}</p>
              <span className="block text-xs opacity-70 mt-1 text-right">
                {msg.time}
              </span>
            </div>

            {/* My photo */}
            {msg.sender === user?._id && myPhoto && (
              <img
                src={myPhoto}
                alt="me"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700
        flex gap-2 bg-white dark:bg-gray-900">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700
            text-white rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

