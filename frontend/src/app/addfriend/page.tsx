"use client";
import { User } from "@/contexts/AuthContext";
import { getUserData } from "@/utils/getUserData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../services/api";

const AddFriend = () => {
  const userData = getUserData();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  if (!userData) {
    router.push("/login");
  }

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/users/list", {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });

      setUsers(response.data);
    }
    if (userData) {
      loadUsers();
    }
  }, []);

  async function handleAddContact(id: string) {
    await api.patch(`/contacts/${id}`, null, {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    });

    setUsers(users.filter((user) => user._id !== id));
  }

  return (
    <div className="addperson-container">
      <figure>
        <Link href="/">
          <Image width={300} height={300} src="/logo.svg" alt="Logotipo" />
        </Link>
      </figure>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Image src={user.avatar} alt={user.username} />
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
