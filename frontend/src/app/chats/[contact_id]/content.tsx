"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LeftSide from "../../../components/LeftSide";
import RightSide from "../../../components/RightSide";
import { PORT } from "../../../utils/constants";

type ContentProps = {
  contact_id: string;
};

export function Content(props: ContentProps) {
  const { contact_id } = props;
  const [messages, setMessages] = useState(null);
  const router = useRouter();
  const token = !!localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : false;

  if (!token) {
    router.push("/login");
  }

  useEffect(() => {
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
        contactId={contact_id}
      />
    </div>
  );
}