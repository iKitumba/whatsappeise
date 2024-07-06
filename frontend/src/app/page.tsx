"use client";
import { Message } from "@/types/Message";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import React from "react";
import { io } from "socket.io-client";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { PORT } from "../utils/constants";

export default function Main() {
  const router = useRouter();
  const [messages, setMessages] = React.useState<Message[]>([] as Message[]);
  const userData = getUserData();

  if (!userData) {
    router.push("/login");
  }

  React.useEffect(() => {
    if (userData) {
      const socket = io(`http://localhost:${PORT}`, {
        query: { user: userData.user._id },
      });

      socket.on("message", (savedMessage) => {
        setMessages([...messages, savedMessage]);
      });
    }
  }, [messages]);

  return (
    <div className="container">
      <LeftSide setMessages={setMessages} />
      <RightSide
        messages={messages}
        setMessages={setMessages}
        contactId={null}
      />
    </div>
  );
}
