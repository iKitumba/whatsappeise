"use client";
import React from "react";

import { getUserData } from "@/utils/getUserData";
import { LockIcon, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const authContext = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { handleLogin } = authContext;

  const router = useRouter();
  const userData = getUserData();

  if (userData) {
    router.push("/");
  }

  return (
    <div className="login-container">
      <div className="login-info">
        <div className="">
          <Image width={240} height={60} src={"/logo.svg"} alt="Logo" />
        </div>
        <h1 className="text-zinc-800">
          Faça seu login na <br />
          nossa rede social
        </h1>
      </div>
      <form
        className="login-form max-w-[430px] mx-auto"
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin({ password, username });
        }}
      >
        <label className="login-input-wrapper">
          <User2 size={24} />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="login-input-wrapper">
          <LockIcon size={24} />
          <input
            type="password"
            name="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div className="dont-have-account">
          <Link href="/register" style={{ textDecoration: "none" }}>
            <p>Não tenho uma conta</p>
          </Link>
        </div>

        <button type="submit" className="login-button">
          ENTRAR
        </button>
      </form>
    </div>
  );
}
