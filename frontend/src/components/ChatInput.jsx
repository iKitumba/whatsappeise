import { useState } from "react";
import attach_outline from "../assets/attach_outline.svg";
import happy_outline from "../assets/happy_outline.svg";
import mic from "../assets/mic.svg";
import api from "../services/api";
import "./ChatInput.css";

const ChatInput = ({ friendID, token, setMessages, messages }) => {
  const [text, setText] = useState("");
  const handleSubmitMessage = async (e) => {
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
      <img src={happy_outline} alt="" />
      <img src={attach_outline} alt="" />
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleSubmitMessage}
      />
      <img src={mic} alt="" />
    </div>
  );
};

export default ChatInput;
