import { Contact as ContactProps } from "@/types/Contact";
import { Message } from "@/types/Message";
import { getUserData } from "@/utils/getUserData";
import { Barcode, EllipsisVertical, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../services/api";
import Contact from "./Contact";
import "./LeftSide.css";

type LeftSideProps = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const LeftSide = ({ setMessages }: LeftSideProps) => {
  const [contacts, setContacts] = useState<ContactProps[]>(
    [] as ContactProps[]
  );
  const { contact_id } = useParams();
  const userInfo = getUserData();

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

  const handleContactClick = async (id: string) => {
    const { data } = await api.get<Message[]>(`/message/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    });

    setMessages(data);
  };

  console.log({ contacts });

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
            <Barcode size={24} />
          </li>
          <li>
            <MessageCircle size={24} />
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
              time={new Date(c.createdAt)}
              active={contact_id === c._id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
