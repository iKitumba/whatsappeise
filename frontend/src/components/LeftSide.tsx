import { Barcode, EllipsisVertical, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../services/api";
import Contact from "./Contact";
import "./LeftSide.css";

const LeftSide = ({ userInfo, setMessages }) => {
  const [contacts, setContacts] = useState([]);
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
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <img
            src={userInfo?.user?.avatar}
            className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
          />
        </div>
        <ul className="flex gap-2">
          <li>
            <Barcode size={24} alt="" />
          </li>
          <li>
            <MessageCircle size={24} alt="" />
          </li>
          <li>
            <EllipsisVertical size={24} />
          </li>
        </ul>
      </div>
      {/* Search */}
      <div className="search_chat relative w-full h-12 bg-gray-100 flex items-center justify-center px-4">
        <div className="flex flex-1 items-center gap-2 px-3 justify-between  bg-white rounded-full">
          <Search size={24} />
          <input
            className="flex flex-1 w-full outline-none border-none h-9 text-sm"
            type="text"
            placeholder="Search or start new chat"
          />
        </div>
      </div>

      {/* Chatlist */}

      <div className="chatlist">
        {contacts?.map((c) => (
          <Link
            style={{ textDecoration: "none" }}
            href={`/chats/${c._id}`}
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
