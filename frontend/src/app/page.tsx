"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { io } from "socket.io-client";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { PORT } from "../utils/constants";

export default function Main() {
  const router = useRouter();
  const [messages, setMessages] = React.useState([]);
  const token = !!localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : false;

  if (!token) {
    router.push("/login", { replace: true });
  }

  React.useEffect(() => {
    if (token) {
      const socket = io(`http://localhost:${PORT}`, {
        query: { user: token.user._id },
      });

      socket.on("message", (savedMessage) => {
        setMessages([...messages, savedMessage]);
      });
    }
  }, [messages]);

  return (
    <div className="container">
      <LeftSide userInfo={token} setMessages={setMessages} />
      <RightSide
        userInfo={token}
        messages={messages}
        setMessages={setMessages}
        contactId={null}
      />
    </div>
  );
}
