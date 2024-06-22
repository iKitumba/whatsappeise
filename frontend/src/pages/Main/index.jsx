import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import LeftSide from "../../components/LeftSide";
import RightSide from "../../components/RightSide";
import { PORT } from "../../utils/constants";
import "./Main.css";

export default function Main() {
  const { contact_id } = useParams();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const token = !!localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : false;

  if (!token) {
    navigate("/login", { replace: true });
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
      <LeftSide
        userInfo={token}
        messages={messages}
        setMessages={setMessages}
      />
      <RightSide
        userInfo={token}
        messages={messages}
        setMessages={setMessages}
        contactId={contact_id}
      />
    </div>
  );
}
