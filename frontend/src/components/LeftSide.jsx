import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import chatbox from "../assets/chatbox.svg";
import ellipsis_vertical from "../assets/ellipsis_vertical.svg";
import scan_circle_outline from "../assets/scan_circle_outline.svg";
import search_outline from "../assets/search_outline.svg";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import Contact from "./Contact";
import "./LeftSide.css";

const LeftSide = ({ userInfo, setMessages }) => {
  const [contacts, setContacts] = useState([]);
  const authContext = useContext(AuthContext);
  const { contact_id } = useParams();

  useEffect(() => {
    async function loadContacts() {
      if (userInfo) {
        const { data } = await api.get("/contacts", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setContacts(data.contacts);
      }
    }

    loadContacts();
  }, []);

  const handleContactClick = async (id) => {
    const { data } = await api.get(`/message/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    setMessages(data);
  };

  return (
    <div className="leftSide">
      <div className="header">
        <div className="userImg">
          <img src={userInfo?.user?.avatar} className="cover" />
        </div>
        <ul className="nav_icons">
          <li>
            <img src={scan_circle_outline} alt="" />
          </li>
          <li>
            <img src={chatbox} alt="" />
          </li>
          <li>
            <img src={ellipsis_vertical} alt="" />
          </li>
        </ul>
      </div>
      {/* Search */}
      <div className="search_chat">
        <div>
          <input type="text" placeholder="Search or start new chat" />
          <img src={search_outline} alt="" />
        </div>
      </div>

      {/* Chatlist */}

      <div className="chatlist">
        {contacts?.map((c) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/chats/${c._id}`}
            key={c._id}
            onClick={() => handleContactClick(c._id)}
          >
            <Contact
              username={c.username}
              avatar={c.avatar}
              bio={c.bio}
              // time={c.time}
              // unread={c.unread}
              active={contact_id === c._id}
              // numRecived={c.numRecived}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
