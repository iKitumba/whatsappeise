"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../services/api";

const AddFriend = () => {
  const token = !!localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : false;
  const router = useRouter();
  const [users, setUsers] = useState([]);

  if (!token) {
    router.push("/login");
  }

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/users/list", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      setUsers(response.data);
    }
    if (token) {
      loadUsers();
    }
  }, []);

  async function handleAddContact(id: string) {
    await api.patch(`/contacts/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    setUsers(users.filter((user) => user._id !== id));
  }

  return (
    <div className="addperson-container">
      <figure>
        <Link href="/">
          <img src="/logo.svg" alt="Whatsappeise" />
        </Link>
      </figure>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.username} />
            <footer>
              <strong>{user.username}</strong>
              <p>{user.bio}</p>
            </footer>
            <button type="button" onClick={() => handleAddContact(user._id)}>
              Add Contact
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddFriend;
