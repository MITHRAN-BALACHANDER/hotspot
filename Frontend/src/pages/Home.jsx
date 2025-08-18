import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

// Components
import AnimatedBackground from "../components/AnimatedBackground";
import NicknameSetup from "../components/NicknameSetup";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import MessageInput from "../components/MessageInput";

const Home = () => {
  const socketRef = useRef(null);

  const [nick, setNick] = useState(localStorage.getItem("nickname"));
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [code, setCode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  // User data from local storage
  const UserData = JSON.parse(localStorage.getItem("userdata"));
  const nickName = localStorage.getItem("nickname");

  const handleNicknameSet = (nickname) => {
    setNick(nickname);
    localStorage.setItem("nickname", nickname);
    toast.success("Anonymous Name added Successfully!", {
      style: {
        borderRadius: "12px",
        background: "#1f2937",
        color: "#fff",
      },
    });
  };

  const handleSendMessage = (messageText) => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", messageText);
    }
  };

  // Get geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      setIsConnecting(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsConnecting(false);
      });
    }
  }, []);

  // Setup socket connection once we have location + nickname
  useEffect(() => {
    if (location.latitude && location.longitude && nickName) {
      const la = Math.floor(location.latitude / 0.01);
      const lo = Math.floor(location.longitude / 0.01);
      const SecretCode = `${la}_${lo}`;
      setCode(SecretCode);

      // Use local backend in dev, same-origin in prod
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || window.location.origin;

      socketRef.current = io(backendUrl, {
        transports: ["websocket"], // more reliable on Render
      });

      socketRef.current.emit("join", { name: nickName, room: SecretCode });

      toast.success(`Welcome ${UserData?.name || nickName}!`, {
        duration: 3000,
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#fff",
        },
      });

      socketRef.current.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [location, nickName]);

  return (
    <>
      <Toaster />
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Navbar */}
        <div className="flex-shrink-0">
          <Navbar props={location} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {!nickName ? (
              <NicknameSetup
                key="nickname-setup"
                onNicknameSet={handleNicknameSet}
              />
            ) : (
              <motion.div
                key="chat-interface"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col min-h-0"
              >
                {/* Chat Header */}
                <ChatHeader location={location} isConnecting={isConnecting} />

                {/* Chat Messages */}
                <ChatMessages
                  messages={messages}
                  nickName={nickName}
                  nick={nick}
                  isConnecting={isConnecting}
                />

                {/* Message Input */}
                <MessageInput onSendMessage={handleSendMessage} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Home;
