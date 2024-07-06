import { LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import ChatInput from "./ChatInput";
import Message from "./Message";
import "./RightSide.css";

const RightSide = ({ userInfo, messages, setMessages, contactId }) => {
  const authContext = useContext(AuthContext);
  const { handleLogOut, user } = authContext;
  const scrollRef = useRef(null);

  useEffect(() => {
    async function loadMessages() {
      if (contactId) {
        const { data } = await api.get(`/message/${contactId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        console.log(data);
        setMessages(data);
      }
    }

    loadMessages();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="rightSide">
      <div className="header">
        <div className="imgText">
          <div className="userImg">
            <img src={user?.user?.avatar} className="cover" />
          </div>
          <h4>
            {user?.user?.username} <br />
            <span>online</span>
          </h4>
        </div>
        <ul className="nav_icons">
          <li>
            <Link href="/addfriend">
              <UserPlus size={24} />
            </Link>
          </li>
          <li onClick={handleLogOut}>
            <LogOut size={24} title="Sair" />
          </li>
        </ul>
      </div>

      {/* Chatbox */}

      <div className="chatBox" ref={scrollRef}>
        {contactId &&
          messages?.map((m) => (
            <Message
              key={m._id}
              content={m.text}
              isMy={m.sender_id === user.user._id}
              time={m.createdAt}
            />
          ))}
      </div>

      {/* ChatInput */}

      {contactId && (
        <ChatInput
          friendID={contactId}
          token={userInfo.token}
          setMessages={setMessages}
          messages={messages}
        />
      )}
    </div>
  );
};

export default RightSide;
