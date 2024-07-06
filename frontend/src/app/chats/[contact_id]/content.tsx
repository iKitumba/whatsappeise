"use client";
import { AuthContext } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Message } from "@/types/Message";
import { useRouter } from "next/navigation";
import React from "react";
import { io } from "socket.io-client";
import LeftSide from "../../../components/LeftSide";
import RightSide from "../../../components/RightSide";
import { PORT } from "../../../utils/constants";

type ContentProps = {
  contact_id: string;
};

export function Content(props: ContentProps) {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const { contact_id } = props;
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (user) {
      const socket = io(`http://localhost:${PORT}`, {
        query: { user: user.user._id },
      });

      socket.on("message", (savedMessage) => {
        setMessages([...messages, savedMessage]);
      });
    }
  }, [messages]);

  React.useEffect(() => {
    async function loadInitialMessages() {
      setLoading(true);
      try {
        const { data } = await api.get<Message[]>(`/message/${contact_id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setMessages((prev) => [...data, ...prev]);
      } catch (error) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      loadInitialMessages();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
