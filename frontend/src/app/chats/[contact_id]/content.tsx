"use client";
import { Message } from "@/types/Message";
import { getUserData } from "@/utils/getUserData";
import { redirect } from "next/navigation";
import React from "react";
import { io } from "socket.io-client";
import LeftSide from "../../../components/LeftSide";
import RightSide from "../../../components/RightSide";
import { PORT } from "../../../utils/constants";

type ContentProps = {
  contact_id: string;
};

export function Content(props: ContentProps) {
  const { contact_id } = props;
  const [messages, setMessages] = React.useState<Message[]>([] as Message[]);
  const userData = getUserData();

  if (!userData) {
    redirect("/login");
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
        contactId={contact_id}
      />
    </div>
  );
}
