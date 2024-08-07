import { Message } from "@/types/Message";
import { Link, Mic, Mic2 } from "lucide-react";
import { useState } from "react";
import api from "../services/api";
import "./ChatInput.css";

type ChatInputProps = {
  friendID: string;
  token: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
};

const ChatInput = ({
  friendID,
  token,
  setMessages,
  messages,
}: ChatInputProps) => {
  const [text, setText] = useState("");
  
  const handleSubmitMessage = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const { data } = await api.post(
        `/message/${friendID}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(() => [...messages, data]);
      setText("");
    }
  };
  return (
    <div className="chatbox_input">
      <Mic size={24} />
      <Link size={24} />
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleSubmitMessage}
      />
      <Mic2 size={24} />
    </div>
  );
};

export default ChatInput;
