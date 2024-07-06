"use client";
import React from "react";

import api from "../../services/api";

import { getUserData } from "@/utils/getUserData";
import { Lock, Smile, Upload, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [registerForm, setRegisterForm] = React.useState({
    username: "",
    bio: "",
    password: "",
    repeat: "",
  });

  const router = useRouter();

  const userData = getUserData();

  if (userData) {
    router.push("/");
  }

  const preview = React.useMemo(() => {
    return avatar ? URL.createObjectURL(avatar) : null;
  }, [avatar]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { username, bio, password, repeat } = registerForm;
    if (password !== repeat) {
      alert("As senhas não são iguais");
    } else if (username && bio && password && avatar) {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("bio", bio);
      formData.append("password", password);
      formData.append("avatar", avatar);

      api
        .post("/users/register", formData)
        .then(({ data }) => {
          if (data.token) {
            localStorage.clear();
            localStorage.setItem("user_data", JSON.stringify(data));

            router.push("/");
          } else {
            alert(`Já existe um usuário com este nome (${username})`);
          }
        })
        .catch((error) => {
          alert(`Já existe um usuário com este nome (${username})`);
          console.log(error);
        });
    } else {
      alert("Por favor preencha todos os campos");
    }
  };

  return (
    <div className="register-container">
      <div className="register-info">
        <div className="logo-container">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <h1>
          Registre-se na nossa <br />
          rede social
        </h1>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <label
          className={`upload-area ${preview ? "has-preview" : ""}`}
          style={{ backgroundImage: `url(${preview})` }}
        >
          <div className="upload-info">
            <Upload size={24} />
            <p>avatar</p>
          </div>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) =>
              setAvatar(e.target.files ? e.target.files[0] : null)
            }
          />
        </label>

        <label className="input-wrapper">
          <User2 size={24} />
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleInputChange}
            value={registerForm.username}
          />
        </label>

        <label className="input-wrapper">
          <Smile size={24} />
          <input
            type="text"
            name="bio"
            placeholder="bio"
            onChange={handleInputChange}
            value={registerForm.bio}
          />
        </label>

        <label className="input-wrapper">
          <Lock size={24} />
          <input
            type="password"
            name="password"
            placeholder="senha"
            onChange={handleInputChange}
            value={registerForm.password}
          />
        </label>

        <label className="input-wrapper">
          <Lock size={24} />
          <input
            type="password"
            name="repeat"
            placeholder="repita"
            onChange={handleInputChange}
            value={registerForm.repeat}
          />
        </label>

        <div className="already-have-account">
          <Link href="/login" style={{ textDecoration: "none" }}>
            <p>Já tenho uma conta</p>
          </Link>
        </div>

        <button type="submit" className="register-button">
          REGISTER
        </button>
      </form>
    </div>
  );
}
